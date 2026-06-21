<?php

namespace App\Events;

use App\Models\JobApplication;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ApplicationStatusUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public JobApplication $application,
        public string $oldStatus,
        public string $newStatus
    ) {
    }
}
