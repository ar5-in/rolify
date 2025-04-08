<?php

namespace App\Http\Controllers;

use App\Models\Employer;
use App\Models\Job;
use Illuminate\Http\Request;

class JobsController extends Controller
{
    function index()
    {
        $jobs = \App\Models\Job::all();
        $featuredJobs = \App\Models\Job::where('is_featured', true)->take(3)->get();
        return view('jobs.index', ['jobs' => $jobs, 'featuredJobs' => $featuredJobs]);
    }

    function show(Job $job)
    {
        //dd($job);
    }

    function create()
    {
        $employers = Employer::all();
        return view('jobs.create', ['employers' => $employers]);
    }

    function store()
    {
        //dd('store new job');
    }

    public function edit(Job $job)
    {
        return view('jobs.edit');
    }

    public function update(Request $request, Job $job)
    {
        //dd($job, $request->all());
    }

    public function destroy(Job $job)
    {
        //dd($job);
    }
}
