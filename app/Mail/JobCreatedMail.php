<?php

namespace App\Mail;

use App\Models\Job;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class JobCreatedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public Job $job)
    {
    }

    public function build(): self
    {
        return $this
            ->subject(__('Your job has been created'))
            ->markdown('emails.job_created', [
                'job' => $this->job,
            ]);
    }
}
