<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $jobs = \App\Models\Job::all();
    $featuredJobs = \App\Models\Job::where('is_featured', true)->take(3)->get();
    return view('jobs.index', ['jobs' => $jobs, 'featuredJobs' => $featuredJobs]);
});
