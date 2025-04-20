<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    function create()
    {
        return Inertia::render('Auth/Login');
    }

    function store(Request $request)
    {
        $attributes = $request->validate([
            'email' => ['required','email', 'exists:users'],
            'password' => ['required']
        ]);

        if(!Auth::attempt($attributes))
        {
            throw ValidationException::withMessages(['email' => "The credentials did not match"]);
        }

        $request->session()->flash('global_message_success', 'Logged in as ' . auth()->user()->name);
        return redirect('/');
    }

    function destroy()
    {
        Auth::logout();
        request()->session()->flash('global_message_success', 'Logged out successfully');
        return redirect('/');
    }
}
