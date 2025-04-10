<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class CreatedJobsController extends Controller
{
    function __invoke()
    {
        $jobs = Job::query()
            ->whereBelongsTo(auth()->user()->employers)
            ->get();

        return view('jobs.my')
            ->with('jobs', $jobs);
    }
}
