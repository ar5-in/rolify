<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\Job;
use App\Models\Tag;
use Illuminate\Http\Request;

class JobsController extends Controller
{
    function index()
    {
        $jobs = \App\Models\Job::latest()->get();
        $featuredJobs = \App\Models\Job::where('is_featured', true)->latest()->take(3)->get();
        return view('jobs.index', ['jobs' => $jobs, 'featuredJobs' => $featuredJobs]);
    }

    function show(Job $job)
    {
        return view('jobs.show', ['job' => $job]);
    }

    function create()
    {
        $employers = Employer::all();
        return view('jobs.create', ['employers' => $employers]);
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
        if($request->input('tags') ?? false)
        {
            foreach(explode(',', $request->input('tags')) as $tagName)
            {
                $tag = Tag::createOrFirst(['name'=>trim($tagName)]);
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
            ->with('employers', Employer::all());
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
        if($request->input('tags') ?? false)
        {
            // remove all
            $job->tags()->detach();
            foreach(explode(',', $request->input('tags')) as $tagName)
            {
                $tag = Tag::createOrFirst(['name'=>trim($tagName)]);
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
