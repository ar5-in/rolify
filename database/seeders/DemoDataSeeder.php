<?php

namespace Database\Seeders;

use App\Models\Employer;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\Role;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure base roles exist
        $recruiterRole = Role::firstOrCreate(['title' => 'Recruiter']);
        $candidateRole = Role::firstOrCreate(['title' => 'Candidate']);

        // Create Tags
        $tags = Tag::factory(200)->create();

        // Create accessible demo users
        $recruiter = User::updateOrCreate(
            ['email' => 'recruiter@rolify.ar5.in'],
            [
                'name' => 'Demo Recruiter',
                'role_id' => $recruiterRole->id,
                'password' => Hash::make('demo-recruiter'),
                'email_verified_at' => now(),
            ]
        );

        $candidate = User::updateOrCreate(
            ['email' => 'johndoe@rolify.ar5.in'],
            [
                'name' => 'John Doe',
                'role_id' => $candidateRole->id,
                'password' => Hash::make('demo-candidate'),
                'email_verified_at' => now(),
            ]
        );

        // Real company names for employers
        $companies = [
            'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Uber', 'Airbnb', 'Stripe',
            'Shopify', 'Salesforce', 'NVIDIA', 'Intel', 'AMD', 'Oracle', 'Cisco', 'IBM', 'Adobe',
            'Spotify', 'Twitter', 'Tesla', 'SpaceX', 'Atlassian', 'Slack', 'Zoom', 'Snowflake',
            'Databricks', 'Palantir', 'Block (Square)', 'GitHub', 'GitLab', 'DigitalOcean',
            'Cloudflare', 'Dropbox', 'Pinterest', 'Reddit', 'LinkedIn', 'ByteDance', 'Tencent',
            'Alibaba', 'SAP', 'Siemens', 'Nokia', 'Ericsson', 'PayPal', 'Coinbase', 'DoorDash',
            'Instacart', 'Twilio', 'MongoDB'
        ];

        // Create a primary employer owned by the demo recruiter
        $recruiterEmployer = Employer::factory()->create([
                'name' => 'Rolify Demo Labs',
                'user_id' => $recruiter->id
            ]);

        // Create additional recruiters to own other employers (non-accessible test data)
        $extraRecruiters = User::factory(10)->create([
            'role_id' => $recruiterRole->id,
        ]);

        // Create employers for the real companies, assign owners round-robin among recruiters
        $allRecruiterIds = collect([$recruiter->id])->merge($extraRecruiters->pluck('id'))->values();
        $employers = collect();
        foreach ($companies as $i => $company) {
            $ownerId = $allRecruiterIds[$i % $allRecruiterIds->count()];
            $employers->push(
                Employer::factory()->create([
                        'name' => $company,
                        'user_id' => $ownerId
                    ])
            );
        }

        // Create candidate pool including the demo candidate
        $extraCandidates = User::factory(40)->create([
            'role_id' => $candidateRole->id,
        ]);
        $candidatePool = collect([$candidate])->merge($extraCandidates);

        // 1) Ensure 5 jobs are owned by the demo recruiter
        $recruiterJobs = Job::factory(5)
            ->hasAttached($tags->random(5))
            ->create([
            'employer_id' => $recruiterEmployer->id,
        ]);

        // 2) Create remaining jobs to reach 50 total, distributed among employers
        $remaining = 50 - $recruiterJobs->count();
        $otherJobs = collect();
        for ($i = 0; $i < $remaining; $i++) {
            $employer = $employers[$i % $employers->count()];
            $otherJobs->push(Job::factory()->hasAttached($tags->random(5))->create([
                'employer_id' => $employer->id,
            ]));
        }

        $allJobs = $recruiterJobs->merge($otherJobs);

        // Create job applications for several jobs
        // - Ensure the demo candidate applies to 3 featured jobs (or any 3 if fewer)
        $targetForDemo = $allJobs->shuffle()->take(3);
        foreach ($targetForDemo as $job) {
            JobApplication::firstOrCreate(
                ['job_id' => $job->id, 'user_id' => $candidate->id],
                ['cover_letter' => 'Excited to apply for this role!', 'status' => 'pending']
            );
        }

        // - For each job, create 1–5 random applications from the candidate pool
        foreach ($allJobs as $job) {
            $applicants = $candidatePool->shuffle()->take(random_int(1, 5));
            foreach ($applicants as $applicant) {
                JobApplication::firstOrCreate(
                    ['job_id' => $job->id, 'user_id' => $applicant->id],
                    ['cover_letter' => fake()->realText(), 'status' => fake()->randomElement(['pending', 'rejected', 'approved'])]
                );
            }
        }
    }
}
