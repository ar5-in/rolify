<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FAQController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('FAQ', [
            'heading' => 'Frequently Asked Questions',
            'questions' => [
            'Here is the first question, is it?',
            'Do you want another question?'
            ]
        ]);
    }
}
