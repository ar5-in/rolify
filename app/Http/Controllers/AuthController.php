<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    function create()
    {
        return view('auth.login');
    }

    function store()
    {

    }

    function destroy()
    {

    }
}
