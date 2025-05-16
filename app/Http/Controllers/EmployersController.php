<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmployersController extends Controller
{
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
}
