<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employer' => new EmployerResource($this->employer),
            'tags' => TagResource::collection($this->tags),
            'title' => $this->title,
            'compensation' => $this->compensation,
            'location' => $this->location,
            'is_featured' => $this->is_featured,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'authUser' => [
                'can' => [
                    'view' => auth()->user() && auth()->user()->can('view', $this),
                    'update' => auth()->user() && auth()->user()->can('update', $this),
                    'delete' => auth()->user() && auth()->user()->can('delete', $this),
                ]
            ]
        ];
    }
}
