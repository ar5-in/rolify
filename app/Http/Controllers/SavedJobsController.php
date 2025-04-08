<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class SavedJobsController extends Controller
{
    public function index()
    {
        return view('jobs.saved.index', ['jobs' => Job::all()]);
    }

    public function store(Request $request)
    {
        dd(request()->all());
    }

    public function destroy()
    {
        dd(request()->all());
    }
}
