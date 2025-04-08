<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class RegistrationController extends Controller
{
    function create()
    {
        $roles = Role::all();
        return view('auth.register', ['roles' => $roles]);
    }

    function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required'],
            'email' => ['required', 'email', 'unique:users'],
            'role_id' => ['required', 'numeric', 'exists:roles,id'],
            'password' => ['required', Password::min(6), 'confirmed']
        ]);

        $user = User::create($attributes);

        Auth::login($user);

        return redirect('/');
    }
}
