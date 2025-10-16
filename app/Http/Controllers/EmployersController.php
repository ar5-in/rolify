<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

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
        $attributes = $request->validate([
            'name' => ['required'],
            'logo_url' => ['required', 'url']
        ]);

        $newEmployer = auth()->user()->employers()
            ->create($attributes);

        return response()->json(['employer' => $newEmployer]);
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
