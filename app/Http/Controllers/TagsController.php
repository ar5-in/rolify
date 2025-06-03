<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;

class TagsController extends Controller
{
    function show(Tag $tag)
    {
        $jobs = $tag->jobs()
            ->with('employer', 'tags')
            ->get();

        return Inertia::render('Tags/Index')
            ->with('tag', $tag)
            ->with('jobs', $jobs);
    }
}
