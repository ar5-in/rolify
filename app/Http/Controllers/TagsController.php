<?php

namespace App\Http\Controllers;

use App\Http\Resources\JobResource;
use App\Models\Tag;
use Inertia\Inertia;

class TagsController extends Controller
{
    function show(Tag $tag)
    {
        $jobs = $tag->jobs()
            ->with('employer', 'tags')
            ->paginate(3);

        return Inertia::render('Tags/Index')
            ->with('tag', $tag)
            ->with('jobs', JobResource::collection($jobs));
    }
}
