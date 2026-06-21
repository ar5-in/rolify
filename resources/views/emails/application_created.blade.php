<x-mail::message>
# {{ __('New Application Submitted') }}

@php
    $jobTitle = $application->job->title ?? __('the job');
    $applicantName = $application->user->name ?? __('A candidate');
@endphp

{{ __(':applicant has submitted an application for ":title".', ['applicant' => $applicantName, 'title' => $jobTitle]) }}

<x-mail::button :url="url('/jobs/' . $application->job->id)">
{{ __('View Job') }}
</x-mail::button>

{{ __('Thanks,') }}<br>
{{ config('app.name') }}
</x-mail::message>
