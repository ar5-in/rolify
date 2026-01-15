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
            'items' => [
                [
                    'question' => 'Are real jobs listed on Rolify?',
                    'answer' => 'No, jobs on this platform are not real and are just placeholders to test the functionality of the site.'
                ],
                [
                    'question' => 'What stack is used to build this platform?',
                    'answer' => 'Rolify is built using Laravel with Inertia.js and React.'
                ],
            ]
        ]);
    }
}
