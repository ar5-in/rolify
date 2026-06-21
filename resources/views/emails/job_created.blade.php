<x-mail::message>
# {{ __('Job Created') }}

{{ __('Your job ":title" has been created successfully.', ['title' => $job->title]) }}

<x-mail::button :url="url('/jobs/' . $job->id)">
{{ __('View Job') }}
</x-mail::button>

{{ __('Thanks,') }}<br>
{{ config('app.name') }}
</x-mail::message>
