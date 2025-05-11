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
            ->get();

        return Inertia::render('Jobs/Created/Index')
            ->with('jobs', $jobs->map(function($job) {
                return array_merge($job->toArray(), [
                    'authUser' => [
                        'can' => [
                            'view' => auth()->user() && auth()->user()->can('view', $job),
                            'update' => auth()->user() && auth()->user()->can('update', $job),
                            'delete' => auth()->user() && auth()->user()->can('delete', $job),
                        ]
                    ]
                ]);
            }));
    }
}
