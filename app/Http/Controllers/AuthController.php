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
        $request->session()->regenerate();
        $request->session()->flash('global_message_success', 'Logged in as ' . auth()->user()->name);

        if($request->expectsJson())
        {
            return response()->json([
                'user' => auth()->user()->only('id', 'name', 'email'),
                'intended' => $request->session()->get('url.intended')
            ]);
        }

        return redirect()->intended();
    }

    function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        request()->session()->flash('global_message_success', 'Logged out successfully');
        return redirect('/');
    }
}
