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
        throw new Exception("Not yet implemented");
    }

    public function show(string $id)
    {
        throw new Exception("Not yet implemented");
    }

    public function store(Request $request)
    {
        Gate::authorize('create', Employer::class);

        $attributes = $request->validate([
            'name' => ['required'],
            'initials' => ['required'],
            'foreground' => ['required', 'hex_color'],
            'background' => ['required', 'hex_color'],
            'logo_url' => ['filled', 'url']
        ]);

        $newEmployer = auth()->user()->employers()
            ->create($attributes);

        return response()->json(['entry' => $newEmployer], 201);
    }

    public function update(Request $request, string $id)
    {
        throw new Exception("Not yet implemented");
    }

    public function destroy(string $id)
    {
        throw new Exception("Not yet implemented");
    }
}
