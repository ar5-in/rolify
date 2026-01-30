<?php

namespace Database\Seeders;

use App\Models\Employer;
use App\Models\Job;
use App\Models\Role;
use App\Models\Tag;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Tags
        $tags = Tag::factory(7)->create();

        // Create two roles
        $roles = [
            'recruiter' => Role::factory()->create(['title' => 'Recruiter']),
            'candidate' => Role::factory()->create(['title' => 'Candidate'])
        ];

        // Create Users whose role is to be a recruiter
        $recruiters = User::factory(5)->recycle($roles['recruiter'])->create();
        // Recruiters create employers
        $employers = Employer::factory(10)->recycle($recruiters)->create();
        // Jobs are created for employers
        Job::factory(20)
            ->recycle($employers)
            ->hasAttached($tags)
            ->sequence(
                ['is_featured' => fake()->randomElement([true, false])],
                ['is_featured' => fake()->randomElement([true, false])],
                ['is_featured' => fake()->randomElement([true, false])],
                ['is_featured' => fake()->randomElement([true, false])],
            )
            ->create();

        // Create Users whose role is to be a candidate
        User::factory(20)->recycle($roles['candidate'])->create();
    }
}
