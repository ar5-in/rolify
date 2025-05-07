<?php

namespace Database\Factories;

use App\Models\Job;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobApplication>
 */
class JobApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $candidateRole = Role::where('title', 'Candidate')->first();
        return [
            'job_id' => Job::factory(),
            'user_id' => User::factory()->state([
                'role_id' => $candidateRole->id
            ]),
            'cover_letter' => fake()->realText(),
            'status' => fake()->randomElement(['pending', 'rejected', 'approved']),
        ];
    }
}
