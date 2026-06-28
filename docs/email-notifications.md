## Queued Email Notifications

### Overview
Rolify sends notification emails for key events using Laravel Queues and Markdown Mailables:
- Job Created → only the job creator (job owner)
- Application Created → the applicant and the job owner
- Application Approved/Rejected → the applicant and the job owner

All notifications are queued; nothing is sent inline. In development, emails appear in Mailpit.

### Environment variables
- Development (Mailpit):
    - `MAIL_MAILER=smtp`
    - `MAIL_HOST=mailpit`
    - `MAIL_PORT=1025`
    - `MAIL_ENCRYPTION=null`
    - `MAIL_FROM_ADDRESS=noreply@rolify.local`
    - `MAIL_FROM_NAME=Rolify`
    - `QUEUE_CONNECTION=redis`
- Testing (in-memory):
    - `.env.testing`: `MAIL_MAILER=array`, `QUEUE_CONNECTION=sync`, provide `APP_KEY`.
- Staging/Production (real provider example - SMTP):
    - `MAIL_MAILER=smtp`
    - `MAIL_HOST=<your-smtp-host>`
    - `MAIL_PORT=587`
    - `MAIL_USERNAME=<user>`
    - `MAIL_PASSWORD=<password>`
    - `MAIL_ENCRYPTION=tls`
    - `QUEUE_CONNECTION=redis`

### Running the queue worker
- Docker dev stack starts a dedicated queue worker service automatically:
    - Command: `php artisan queue:work --queue=default,emails --tries=3 --timeout=120`
- If running locally without Docker, you can start a worker manually:
    - `php artisan queue:work`

### Running tests
- Ensure you have `.env.testing` with:
    - `APP_KEY=base64:...`
    - `MAIL_MAILER=array`
    - `QUEUE_CONNECTION=sync`
- Run the test suite:
    - `vendor/bin/phpunit`
    - Or specific file: `vendor/bin/phpunit tests/Feature/EmailNotificationsTest.php`

### Previewing Markdown templates
All email templates reside under `resources/views/emails/` and are rendered via Markdown mailables:
- `emails/job_created.blade.php`
- `emails/application_created.blade.php`
- `emails/application_approved.blade.php`
- `emails/application_rejected.blade.php`

Use Mailpit UI (http://localhost:8025) to preview rendered emails in development. For quick visual checks in tests, call `$mailable->build()` then use `$mailable->assertSeeInHtml('...')`.

### Event and listener wiring
Domain events are dispatched from controllers/services after successful DB commits. Listeners live in `app/Listeners` and are auto-discovered at bootstrap. Each listener dispatches a dedicated job that determines recipients and sends the appropriate mailable.

Key classes:
- Events: `App\Events\JobCreated`, `App\Events\ApplicationCreated`, `App\Events\ApplicationStatusUpdated`
- Listeners: `App\Listeners\SendJobCreatedEmail`, `App\Listeners\SendApplicationCreatedEmail`, `App\Listeners\SendApplicationStatusEmail`
- Jobs: `App\Jobs\SendJobCreatedEmailJob`, `App\Jobs\SendApplicationCreatedEmailJob`, `App\Jobs\SendApplicationStatusEmailJob`
- Mail: `App\Mail\JobCreatedMail`, `App\Mail\ApplicationCreatedMail`, `App\Mail\ApplicationApprovedMail`, `App\Mail\ApplicationRejectedMail`

### Usage examples
Dispatching events from application code (already wired in controllers):
```php
JobCreated::dispatch($job);
ApplicationCreated::dispatch($application);
ApplicationStatusUpdated::dispatch($application, $oldStatus, $newStatus);
```

Adding a new notification type (pattern):
1. Create an event `XyzHappened` carrying necessary data.
2. Create a queued listener `SendXyzEmail` that dispatches `SendXyzEmailJob`.
3. Implement `SendXyzEmailJob` to resolve recipients and send `XyzMail`.
4. Create a Markdown mailable `XyzMail` using a new template under `resources/views/emails/xyz.blade.php`.
5. Write/extend feature tests asserting `Mail::assertQueued(XyzMail::class, ...)` and key copy in the HTML/text.

### Troubleshooting
- Seeing “No application encryption key has been specified.” in tests: ensure `APP_KEY` exists in `.env.testing` or `phpunit.xml`.
- No emails in tests: for queued mailables use `Mail::assertQueued(...)` (not `assertSent`).
- Listeners not firing: ensure event discovery is enabled (configured in `bootstrap/app.php`).
