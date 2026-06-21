<x-mail::message>
# {{ __('Application Approved') }}

@php
    $jobTitle = $application->job->title ?? __('the job');
@endphp

{{ __('Good news! Your application for ":title" has been approved.', ['title' => $jobTitle]) }}

<x-mail::button :url="url('/jobs/' . $application->job->id)">
{{ __('View Job') }}
</x-mail::button>

{{ __('Thanks,') }}<br>
{{ config('app.name') }}
</x-mail::message>
