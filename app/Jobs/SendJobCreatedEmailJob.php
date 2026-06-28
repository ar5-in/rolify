<?php

namespace App\Jobs;

use App\Models\Job;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\JobCreatedMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendJobCreatedEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $jobId)
    {
    }

    public $tries = 3;
    public $backoff = [10, 60, 300];

    public function handle(): void
    {
        // Resolve the job and its owner (creator is the employer's user)
        $job = Job::query()
            ->with('employer.user')
            ->find($this->jobId);

        if (!$job || !$job->employer || !$job->employer->user) {
            Log::warning('SendJobCreatedEmailJob: missing relations for job', ['jobId' => $this->jobId]);
            return; // Nothing to send
        }

        $recipient = $job->employer->user;

        // Send a single email to the job creator
        try {
            Log::info('SendJobCreatedEmailJob: sending email', [
                'job_id' => $this->jobId,
                'to' => $recipient->email,
            ]);
            Log::info('Recipient Email: ' . ($recipient->email ?? 'NULL'));
            Mail::to($recipient->email)->send(new JobCreatedMail($job));
            Log::info('SendJobCreatedEmailJob: email sent', [
                'job_id' => $this->jobId,
                'to' => $recipient->email,
            ]);
        } catch (\Throwable $e) {
            Log::error('SendJobCreatedEmailJob: send failed', [
                'job_id' => $this->jobId,
                'to' => $recipient->email,
                'error' => $e->getMessage(),
            ]);
            throw $e; // allow job retry mechanisms to handle
        }
    }
}
