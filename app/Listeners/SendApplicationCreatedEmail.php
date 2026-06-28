<?php

namespace App\Listeners;

use App\Events\ApplicationCreated;
use App\Jobs\SendApplicationCreatedEmailJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class SendApplicationCreatedEmail implements ShouldQueue
{
    public function handle(ApplicationCreated $event): void
    {
        Log::info('SendApplicationCreatedEmail: dispatching job', [
            'application_id' => $event->application->id,
        ]);
        SendApplicationCreatedEmailJob::dispatch($event->application->id);
    }
}
