<?php

use Illuminate\Support\Facades\Mail;
use App\Events\JobCreated;
use App\Events\ApplicationCreated;
use App\Events\ApplicationStatusUpdated;
use App\Mail\JobCreatedMail;
use App\Mail\ApplicationCreatedMail;
use App\Mail\ApplicationApprovedMail;
use App\Mail\ApplicationRejectedMail;
use App\Models\User;
use App\Models\Role;
use App\Models\Employer;
use App\Models\Job;
use App\Models\JobApplication;

/**
 * Feature tests for queued email notifications using Markdown Mailables.
 * These tests assert recipient rules and template usage.
 */
beforeEach(function () {
    Role::factory()->create(["title" => "Recruiter"]);
    Role::factory()->create(["title" => "Candidate"]);
});

it('queues and sends a Job Created email only to the job creator (Markdown)', function () {
    Mail::fake();

    // Arrange: job owner (employer->user) and a job
    $owner = User::factory()->create();
    $employer = Employer::factory()->create([
        'user_id' => $owner->id,
    ]);
    $job = Job::factory()->create([
        'employer_id' => $employer->id,
    ]);

    // Act: dispatch domain event (listeners queue and send via sync queue in tests)
    JobCreated::dispatch($job);

    // Assert: exactly one email (JobCreatedMail) to the job creator, using markdown view
    Mail::assertQueued(JobCreatedMail::class, 1);
    Mail::assertQueued(JobCreatedMail::class, function (JobCreatedMail $mail) use ($owner, $job) {
        // Verify mailable data and recipient
        $mail->build();
        expect($mail->markdown)->toBe('emails.job_created');
        return $mail->hasTo($owner->email) && $mail->job->is($job);
    });
});

it('queues and sends an Application Created email to app creator and job owner (Markdown)', function () {
    Mail::fake();

    // Arrange: job owner, applicant, job, application
    $owner = User::factory()->create();
    $employer = Employer::factory()->create(['user_id' => $owner->id]);
    $job = Job::factory()->create(['employer_id' => $employer->id]);
    $applicant = User::factory()->create();
    $application = JobApplication::factory()->create([
        'user_id' => $applicant->id,
        'job_id' => $job->id,
        'status' => 'pending',
    ]);

    // Act
    ApplicationCreated::dispatch($application);

    // Assert: 2 emails, to applicant and owner; correct markdown view
    Mail::assertQueued(ApplicationCreatedMail::class, 2);
    Mail::assertQueued(ApplicationCreatedMail::class, function (ApplicationCreatedMail $mail) use ($owner) {
        $mail->build();
        return $mail->hasTo($owner->email) && $mail->markdown === 'emails.application_created';
    });
    Mail::assertQueued(ApplicationCreatedMail::class, function (ApplicationCreatedMail $mail) use ($applicant) {
        $mail->build();
        return $mail->hasTo($applicant->email) && $mail->markdown === 'emails.application_created';
    });
});

it('queues and sends an Application Approved email to both parties (Markdown)', function () {
    Mail::fake();

    // Arrange
    $owner = User::factory()->create();
    $employer = Employer::factory()->create(['user_id' => $owner->id]);
    $job = Job::factory()->create(['employer_id' => $employer->id]);
    $applicant = User::factory()->create();
    $application = JobApplication::factory()->create([
        'user_id' => $applicant->id,
        'job_id' => $job->id,
        'status' => 'pending',
    ]);

    // Act
    ApplicationStatusUpdated::dispatch($application, 'pending', 'approved');

    // Assert
    Mail::assertQueued(ApplicationApprovedMail::class, 2);
    Mail::assertQueued(ApplicationApprovedMail::class, function (ApplicationApprovedMail $mail) use ($owner) {
        $mail->build();
        return $mail->hasTo($owner->email) && $mail->markdown === 'emails.application_approved';
    });
    Mail::assertQueued(ApplicationApprovedMail::class, function (ApplicationApprovedMail $mail) use ($applicant) {
        $mail->build();
        return $mail->hasTo($applicant->email) && $mail->markdown === 'emails.application_approved';
    });
});

it('queues and sends an Application Rejected email to both parties (Markdown)', function () {
    Mail::fake();

    // Arrange
    $owner = User::factory()->create();
    $employer = Employer::factory()->create(['user_id' => $owner->id]);
    $job = Job::factory()->create(['employer_id' => $employer->id]);
    $applicant = User::factory()->create();
    $application = JobApplication::factory()->create([
        'user_id' => $applicant->id,
        'job_id' => $job->id,
        'status' => 'pending',
    ]);

    // Act
    ApplicationStatusUpdated::dispatch($application, 'pending', 'rejected');

    // Assert
    Mail::assertQueued(ApplicationRejectedMail::class, 2);
    Mail::assertQueued(ApplicationRejectedMail::class, function (ApplicationRejectedMail $mail) use ($owner) {
        $mail->build();
        return $mail->hasTo($owner->email) && $mail->markdown === 'emails.application_rejected';
    });
    Mail::assertQueued(ApplicationRejectedMail::class, function (ApplicationRejectedMail $mail) use ($applicant) {
        $mail->build();
        return $mail->hasTo($applicant->email) && $mail->markdown === 'emails.application_rejected';
    });
});
