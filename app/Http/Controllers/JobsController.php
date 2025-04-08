<?php

namespace App\Http\Controllers;

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
        dd($job);
    }

    function create()
    {
        return view('jobs.create');
    }

    function store()
    {
        dd('store new job');
    }
}
