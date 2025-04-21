<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreatedJobsController extends Controller
{
    function __invoke()
    {
        $jobs = Job::query()
            ->with('employer', 'tags')
            ->whereBelongsTo(auth()->user()->employers)
            ->withCasts([
                'created_at' => 'datetime:M d, Y',
                'updated_at' => 'datetime:M d, Y',
            ])
            ->get();

        return Inertia::render('Jobs/Created/Index')
            ->with('jobs', $jobs);
    }
}
