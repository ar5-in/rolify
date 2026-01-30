<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreatedJobsController extends Controller
{
    function __invoke()
    {
        return Inertia::render('Jobs/Created/Index')
            ->with('jobs', Job::createdBy(auth()->user())->map(function($job) {
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
