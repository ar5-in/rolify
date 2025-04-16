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
            'jobs' => $jobs,
            'featuredJobs' => $featuredJobs
        ]);
    }

    function show(Job $job)
    {
        return Inertia::render('Jobs/Show')
            ->with('job', $job);
    }

    function create()
    {
        return view('jobs.create')
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

        request()->session()->flash('global_message_success', 'Job (' . $job->title . ') created.');
        // redirect to job details
        return redirect('/jobs/' . $job->id);
    }

    public function edit(Job $job)
    {
        return view('jobs.edit')
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

        request()->session()->flash('global_message_success', 'Job (' . $job->title . ') updated.');
        return redirect('/jobs/' . $job->id);
    }

    public function destroy(Job $job)
    {
        $job->delete();
        request()->session()->flash('global_message_success', 'Job (' . $job->title . ') deleted.');
        return redirect('/');
    }
}
