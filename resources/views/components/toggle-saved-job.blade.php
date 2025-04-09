@php
$isJobSaved = auth()->user()->savedJobs()->where('job_id', $job->id)->exists();
@endphp
<form action="/jobs/saved" method="POST">
    @csrf
    @if($isJobSaved)
        @method('DELETE')
    @endif
    <input type="hidden" name="job_id" value="{{ $job->id }}">
    <button class="cursor-pointer">
        <img class="inline-block w-[44px] p-2 bg-body-bg border border-black/20 hover:border-black/40 rounded-full" src="{{ $isJobSaved ? Vite::asset('resources/images/icon-unsave.svg') : Vite::asset('resources/images/icon-save.svg') }}" alt="Save Job">
    </button>
</form>
