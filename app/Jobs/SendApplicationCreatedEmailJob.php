<?php

namespace App\Jobs;

use App\Models\JobApplication;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApplicationCreatedMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendApplicationCreatedEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $applicationId)
    {
    }

    public $tries = 3;
    public $backoff = [10, 60, 300];

    public function handle(): void
    {
        // Resolve application with applicant and job owner
        $application = JobApplication::query()
            ->with(['user', 'job.employer.user'])
            ->find($this->applicationId);

        if (!$application) {
            Log::warning('SendApplicationCreatedEmailJob: application not found', ['applicationId' => $this->applicationId]);
            return;
        }

        $applicant = $application->user; // creator of the application
        $jobOwner = optional($application->job)->employer?->user;

        $recipients = collect([$applicant, $jobOwner])
            ->filter(fn($u) => $u && $u->email)
            ->unique('email');

        if ($recipients->isEmpty()) {
            Log::warning('SendApplicationCreatedEmailJob: no recipients resolved', ['applicationId' => $this->applicationId]);
            return;
        }

        foreach ($recipients as $user) {
            try {
                Log::info('SendApplicationCreatedEmailJob: sending email', [
                    'application_id' => $this->applicationId,
                    'to' => $user->email,
                ]);
                Mail::to($user->email)->send(new ApplicationCreatedMail($application));
                Log::info('SendApplicationCreatedEmailJob: email sent', [
                    'application_id' => $this->applicationId,
                    'to' => $user->email,
                ]);
            } catch (\Throwable $e) {
                Log::error('SendApplicationCreatedEmailJob: send failed', [
                    'application_id' => $this->applicationId,
                    'to' => $user->email,
                    'error' => $e->getMessage(),
                ]);
                throw $e;
            }
        }
    }
}
