<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployerResource extends JsonResource
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
            'user_id' => $this->user_id,
            'name' => $this->name,
            'logo_url' => $this->logo_url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'initials' => $this->initials,
            'foreground' => $this->foreground,
            'background' => $this->background,
        ];
    }
}
