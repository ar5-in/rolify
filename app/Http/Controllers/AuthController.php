<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    function create()
    {
        return view('auth.login');
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

        return redirect('/');
    }

    function destroy()
    {
        Auth::logout();
        return redirect('/');
    }
}
