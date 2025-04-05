<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    function create()
    {
        return view('auth.register');
    }

    function store()
    {

    }
}
