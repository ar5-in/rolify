<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class SavedJobsController extends Controller
{
    public function index()
    {
        // TODO sort by pivot created_at DESC
        return view('jobs.saved.index')
            ->with('jobs', auth()->user()->savedJobs);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'job_id' => 'required|exists:jobs,id'
        ]);

        auth()->user()->savedJobs()->syncWithoutDetaching([$attributes['job_id']]);

        return back();
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
