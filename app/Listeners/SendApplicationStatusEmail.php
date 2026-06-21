<?php

namespace App\Listeners;

use App\Events\ApplicationStatusUpdated;
use App\Jobs\SendApplicationStatusEmailJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class SendApplicationStatusEmail implements ShouldQueue
{
    public function handle(ApplicationStatusUpdated $event): void
    {
        // Guard: do not dispatch if status hasn't actually changed
        if ($event->oldStatus === $event->newStatus) {
            Log::info('SendApplicationStatusEmail: skipped dispatch, status unchanged', [
                'application_id' => $event->application->id,
                'status' => $event->newStatus,
            ]);
            return;
        }

        Log::info('SendApplicationStatusEmail: dispatching job', [
            'application_id' => $event->application->id,
            'old' => $event->oldStatus,
            'new' => $event->newStatus,
        ]);

        SendApplicationStatusEmailJob::dispatch($event->application->id, $event->newStatus);
    }
}
