<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    function index()
    {
        return view('job-applications.index')->with('jobApplications', auth()->user()->applications()->latest()->get());
    }

    function show(JobApplication $jobApplication)
    {
        return view('job-applications.show')->with('jobApplication', $jobApplication);
    }

    function create(Job $job)
    {
        return view('job-applications.create')->with('job', $job);
    }

    function store(Request $request)
    {
        // validate
        $attributes = $request->validate([
            'job_id' => 'required|exists:jobs,id',
            'cover_letter' => 'required|min:10'
        ]);

        // create new
        $jobApplication = auth()->user()->applications()->create($attributes);

        // redirect back to job
        return redirect('/jobs/' . $jobApplication->job->id)->with('global_message_success', 'Congratulations! Your application is submitted!');
    }

    function edit(JobApplication $jobApplication)
    {
        return view('job-applications.edit')->with('jobApplication', $jobApplication);
    }

    function update(Request $request, JobApplication $jobApplication)
    {
        dd($request->all(), $jobApplication);
    }

    function destroy(JobApplication $jobApplication)
    {
        $jobApplication->delete();
        return back()->with('global_message_success', 'Your application was successfully withdrawn');
    }
}
