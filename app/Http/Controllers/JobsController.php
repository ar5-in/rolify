<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\Job;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobsController extends Controller
{
    function index()
    {
        $jobs = \App\Models\Job::with('employer', 'tags')
            ->withCasts([
                'created_at' => 'datetime:M d, Y',
                'updated_at' => 'datetime:M d, Y',
            ])
            ->latest()
            ->get();

        $featuredJobs = \App\Models\Job::with('employer', 'tags')
            ->withCasts([
                'created_at' => 'datetime:M d, Y',
                'updated_at' => 'datetime:M d, Y',
            ])
            ->where('is_featured', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs->map(function($job) {
                return array_merge($job->toArray(), [
                    'authUser' => [
                        'can' => [
                            'view' => auth()->user() && auth()->user()->can('view', $job),
                            'update' => auth()->user() && auth()->user()->can('update', $job),
                            'delete' => auth()->user() && auth()->user()->can('delete', $job),
                        ]
                    ]
                ]);
            }),
            'featuredJobs' => $featuredJobs->map(function($job) {
                return array_merge($job->toArray(), [
                    'authUser' => [
                        'can' => [
                            'view' => auth()->user() && auth()->user()->can('view', $job),
                            'update' => auth()->user() && auth()->user()->can('update', $job),
                            'delete' => auth()->user() && auth()->user()->can('delete', $job),
                        ]
                    ]
                ]);
            })
        ]);
    }

    function show(Job $job)
    {
        // If the logged-in user has applied to the job, include the application
        $application = auth()->user()
            ? $job->applications()
                ->where('user_id', auth()->user()->id)
                ->withCasts([
                    'created_at' => 'datetime:M d, Y',
                    'updated_at' => 'datetime:M d, Y',
                ])
                ->first()
        : null;

        // If the logged-in user is the owner of the job (because is the owner of the employer), include all applications
        if(auth()->user() && auth()->user()->can('view-job-applications', $job))
        {
            $job->load('applications.user');
        }

        return Inertia::render('Jobs/Show')
            ->with('job', array_merge($job->toArray(), [
                'authUser' => [
                    'application' => !is_null($application) ? array_merge($application->toArray(), [
                        'authUser' => [
                            'can' => [
                                'update_status' => auth()->user() && auth()->user()->can('update-status', $application),
                                'update_cover_letter' => auth()->user() && auth()->user()->can('update-cover-letter', $application),
                                'update' => auth()->user() && auth()->user()->can('update', $application),
                                'delete' => auth()->user() && auth()->user()->can('delete', $application),
                            ]
                        ]
                    ]) : null,
                    'can' => [
                        'view' => auth()->user() && auth()->user()->can('view', $job),
                        'view-job-applications' => auth()->user() && auth()->user()->can('view-job-applications', $job),
                        'update' => auth()->user() && auth()->user()->can('update', $job),
                        'delete' => auth()->user() && auth()->user()->can('delete', $job),
                    ]
                ]
            ]));
    }

    function create()
    {
        return Inertia::render('Jobs/Create')
            ->with('employers', auth()->user()->employers);
    }

    function store(Request $request)
    {
        // validate
        $attributes = $request->validate([
            'employer_id' => ['required', 'exists:employers,id'],
            'title' => ['required'],
            'compensation' => ['required'],
            'location' => ['required'],
        ]);

        // create job
        $attributes['is_featured'] = $request->has('is_featured');
        $job = Job::create($attributes);

        // process tags
        if ($request->input('tags') ?? false) {
            foreach (explode(',', $request->input('tags')) as $tagName) {
                $tag = Tag::createOrFirst(['name' => trim($tagName)]);
                $job->tags()->attach($tag);
            }
        }

        if($request->expectsJson())
        {
            return response()->json([
                'job' => $job
            ]);
        }

        request()->session()->flash('global_message_success', 'Job (' . $job->title . ') created.');
        // redirect to job details
        return redirect('/jobs/' . $job->id);
    }

    public function edit(Job $job)
    {
        return Inertia::render('Jobs/Edit')
            ->with('job', $job)
            ->with('employers', auth()->user()->employers);
    }

    public function update(Request $request, Job $job)
    {
        // validate
        $attributes = $request->validate([
            'employer_id' => ['required', 'exists:employers,id'],
            'title' => ['required'],
            'compensation' => ['required'],
            'location' => ['required'],
        ]);

        // create job
        $attributes['is_featured'] = $request->has('is_featured');
        $job->update($attributes);

        // process tags
        if ($request->input('tags') ?? false) {
            // remove all
            $job->tags()->detach();
            foreach (explode(',', $request->input('tags')) as $tagName) {
                $tag = Tag::createOrFirst(['name' => trim($tagName)]);
                $job->tags()->attach($tag);
            }
        }

        if($request->expectsJson())
        {
            return response('', 201);
        }

        request()->session()->flash('global_message_success', 'Job (' . $job->title . ') updated.');
        return redirect('/jobs/' . $job->id);
    }

    public function destroy(Job $job)
    {
        $job->delete();
        request()->session()->flash('global_message_success', 'Job (' . $job->title . ') deleted.');
        return redirect('/jobs/created');
    }
}
