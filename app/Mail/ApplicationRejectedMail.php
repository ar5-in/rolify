<?php

namespace App\Mail;

use App\Models\JobApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ApplicationRejectedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public JobApplication $application)
    {
    }

    public function build(): self
    {
        return $this
            ->subject(__('Your application was rejected'))
            ->markdown('emails.application_rejected', [
                'application' => $this->application,
            ]);
    }
}
