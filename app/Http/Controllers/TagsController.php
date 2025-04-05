<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    function show(Tag $tag)
    {
        dd($tag);
    }
}
