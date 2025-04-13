<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FAQController extends Controller
{
    function __invoke()
    {
        $questions = collect([
            'Here is the first question, is it?',
            'Do you want another question?'
        ]);

        return Inertia::render('FAQ')
            ->with('heading', 'Frequently Asked Questions')
            ->with('questions', $questions);
    }
}
