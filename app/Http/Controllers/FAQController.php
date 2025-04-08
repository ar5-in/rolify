<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FAQController extends Controller
{
    function __invoke()
    {
        return view('faq');
    }
}
