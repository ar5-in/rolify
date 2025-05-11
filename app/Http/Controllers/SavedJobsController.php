<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SavedJobsController extends Controller
{
    public function index()
    {
        // TODO sort by pivot created_at DESC
        $jobs = auth()->user()->savedJobs()
            ->with('employer', 'tags')
            ->orderByPivot('created_at', 'desc')
            ->get();

        return Inertia::render('Jobs/Saved/Index')->with('jobs', $jobs);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'job_id' => 'required|exists:jobs,id'
        ]);

        auth()->user()->savedJobs()->syncWithoutDetaching([$attributes['job_id']]);

        return back();
    }

    public function sync(Request $request)
    {
        $attributes = $request->validate([
            'job_ids' => 'array'
        ]);

        auth()->user()->savedJobs()->sync($attributes['job_ids']);

        return response()->json(['savedJobs' => auth()->user()->savedJobs()->get()->map(function (Job $job) {
            return $job->id;
        })->all()]);
    }

    public function destroy(Request $request)
    {
        $attributes = $request->validate([
            'job_id' => 'required|exists:jobs,id'
        ]);

        auth()->user()->savedJobs()->detach($attributes['job_id']);

        return back();
    }
}
