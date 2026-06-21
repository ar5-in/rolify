<?php

namespace App\Jobs;

use App\Models\JobApplication;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApplicationApprovedMail;
use App\Mail\ApplicationRejectedMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendApplicationStatusEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $applicationId, public string $newStatus)
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
            Log::warning('SendApplicationStatusEmailJob: application not found', ['applicationId' => $this->applicationId]);
            return;
        }

        // Choose mailable based on status
        $status = strtolower($this->newStatus);
        $mailable = $status === 'approved'
            ? new ApplicationApprovedMail($application)
            : new ApplicationRejectedMail($application);

        $applicant = $application->user;
        $jobOwner = optional($application->job)->employer?->user;

        $recipients = collect([$applicant, $jobOwner])
            ->filter(fn($u) => $u && $u->email)
            ->unique('email');

        if ($recipients->isEmpty()) {
            Log::warning('SendApplicationStatusEmailJob: no recipients resolved', [
                'applicationId' => $this->applicationId,
                'status' => $this->newStatus,
            ]);
            return;
        }

        foreach ($recipients as $user) {
            try {
                Log::info('SendApplicationStatusEmailJob: sending email', [
                    'application_id' => $this->applicationId,
                    'status' => $this->newStatus,
                    'to' => $user->email,
                ]);
                Mail::to($user->email)->send($mailable);
                Log::info('SendApplicationStatusEmailJob: email sent', [
                    'application_id' => $this->applicationId,
                    'status' => $this->newStatus,
                    'to' => $user->email,
                ]);
            } catch (\Throwable $e) {
                Log::error('SendApplicationStatusEmailJob: send failed', [
                    'application_id' => $this->applicationId,
                    'status' => $this->newStatus,
                    'to' => $user->email,
                    'error' => $e->getMessage(),
                ]);
                throw $e;
            }
        }
    }
}
