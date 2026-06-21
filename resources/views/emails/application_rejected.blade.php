<x-mail::message>
# {{ __('Application Rejected') }}

@php
    $jobTitle = $application->job->title ?? __('the job');
@endphp

{{ __('We’re sorry. Your application for ":title" was not selected this time.', ['title' => $jobTitle]) }}

<x-mail::button :url="url('/jobs/' . $application->job->id)">
{{ __('View Job') }}
</x-mail::button>

{{ __('Thanks,') }}<br>
{{ config('app.name') }}
</x-mail::message>
