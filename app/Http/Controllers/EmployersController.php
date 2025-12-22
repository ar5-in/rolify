<?php

namespace App\Http\Controllers;

use Gate;
use Exception;
use Illuminate\Http\Request;
use App\Models\Employer;

class EmployersController extends Controller
{
    public function index()
    {
        Gate::authorize('view-any', Employer::class);
        return response()
            ->json(['entries' => auth()->user()->employers]);
    }

    public function show(Employer $employer)
    {
        Gate::authorize('view', $employer);
        return response()->json(['entry' => $employer]);
    }

    public function store(Request $request)
    {
        Gate::authorize('create', Employer::class);

        $attributes = $request->validate([
            'name' => ['required'],
            'initials' => ['required'],
            'foreground' => ['required', 'hex_color'],
            'background' => ['required', 'hex_color'],
            'logo_url' => ['nullable', 'url']
        ]);

        $newEmployer = auth()->user()->employers()
            ->create($attributes);

        return response()->json(['entry' => $newEmployer], 201);
    }

    public function update(Request $request, Employer $employer)
    {
        Gate::authorize('update', $employer);

        $attributes = $request->validate([
            'name'          => ['filled'],
            'initials'      => ['filled'],
            'foreground'    => ['filled', 'hex_color'],
            'background'    => ['filled', 'hex_color'],
            'logo_url'      => ['nullable', 'url']
        ]);

        $employer->update($attributes);
        $employer->refresh();

        return response()->json(['entry' => $employer]);
    }

    public function destroy(Employer $employer)
    {
        Gate::authorize('delete', $employer);

        $employer->delete();

        return response(status:204);
    }
}
