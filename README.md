![Dark Image](https://github.com/user-attachments/assets/412b7c62-bb97-4502-9d1c-9cb18f2e528a#gh-dark-mode-only)
![Light Image](https://github.com/user-attachments/assets/b045f0fd-3a26-4916-b07c-f114c737b93c#gh-light-mode-only)
---
# Rolify Job Listing Application
Rolify is an application that helps simplify interaction between recruiters and jobseekers.

## Tech stack
Rolify is built using Laravel v12 along with Inertia and React to provide a modern and smooth experience. TailwindCSS is used for styling.

## Development Mail Service (Mailpit)
For local development, the stack includes Mailpit — a lightweight SMTP server with a web UI to preview emails.

Setup:
- Docker Compose (dev) includes a `mailpit` service listening on SMTP `1025` and UI `8025`.
- In your local `.env`, set:
  - `MAIL_MAILER=smtp`
  - `MAIL_HOST=mailpit`
  - `MAIL_PORT=1025`
  - `MAIL_ENCRYPTION=null`
  - `MAIL_FROM_ADDRESS=noreply@rolify.local`
  - `MAIL_FROM_NAME=Rolify`

Usage:
- Start the dev stack: `docker compose -f compose.dev.yaml up -d`
- Open http://localhost:8025 to view sent emails.
- You can send a test email via Tinker (inside the app container):
  - `php artisan tinker`
  - `Mail::raw('Hello from Rolify dev!', fn($m) => $m->to('you@example.com')->subject('Test'));`

Notes:
- Tests use the `array` mailer via `.env.testing`/`phpunit.xml`, so they won't hit Mailpit.
