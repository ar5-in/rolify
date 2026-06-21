<?php

namespace App\Listeners;

use App\Events\JobCreated;
use App\Jobs\SendJobCreatedEmailJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class SendJobCreatedEmail implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(JobCreated $event): void
    {
        Log::info('SendJobCreatedEmail: dispatching job', [
            'job_id' => $event->job->id,
        ]);
        SendJobCreatedEmailJob::dispatch($event->job->id);
    }
}
