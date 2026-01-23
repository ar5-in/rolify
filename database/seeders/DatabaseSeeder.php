<?php

namespace Database\Seeders;

use App\Models\Employer;
use App\Models\Job;
use App\Models\JobApplication;
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
        $tags = Tag::factory(200)->create();

        // Create two roles
        $roles = [
            'recruiter' => Role::factory()->create(['title' => 'Recruiter']),
            'candidate' => Role::factory()->create(['title' => 'Candidate'])
        ];

        // Create Users whose role is to be a recruiter
        $recruiters = User::factory(10)->recycle($roles['recruiter'])->create();

        // Recruiters create employers
        $employers = Employer::factory(20)->recycle($recruiters)->create();

        // Create Users whose role is to be a candidate
        $candidates = User::factory(100)->recycle($roles['candidate'])->create();

        // Jobs are created for employers
        $i = 0;
        $count = 200;
        do {
            $selectedCandidates = $candidates->random(rand(1,10))->unique();
            $job = Job::factory()
                ->recycle($employers)
                ->hasAttached($tags->random(5))
                ->sequence(
                    ['is_featured' => fake()->randomElement([true, false])],
                )
                ->create();

            foreach ($selectedCandidates as $candidate)
            {
                JobApplication::factory()->for($job)->for($candidate)->create();
            }

            $i++;
        } while ($i < $count);
    }
}
