@props(['job'])
<x-panel class="flex">
    <div class="flex flex-3 items-start bg-[#e0f3ff] p-5 rounded-xl space-x-5">
        <div class="flex flex-col-reverse justify-end items-center gap-2">
            <div class="bg-body-bg px-2 py-1 rounded-full text-sm font-medium text-primary">{{ $job->created_at->format('M d, Y') }}</div>
            <button class="cursor-pointer"><img class="inline-block w-[44px] p-2 bg-body-bg border border-black/20 hover:border-black/40 rounded-full" src="{{ Vite::asset('resources/images/icon-save.svg') }}" alt="Save Job"></button>
        </div>
        <div class="flex flex-2 space-x-2">
            <div class="shrink-0">
                <img class="inline-block rounded-full float-right" src="{{ $job->employer->logo_url }}" alt="{{ $job->employer->name }} Logo">
            </div>
            <div class="mt-2.5">
                <div class="mb-1 text-sm font-bold text-primary">{{ $job->employer->name }}</div>
                <h2 class="text-3xl font-medium text-primary">{{ $job->title }}</h2>
            </div>
        </div>
        <div class="flex flex-1 flex-wrap items-start space-x-2 space-y-2">
            @foreach($job->tags as $tag)
                <x-tag :$tag />
            @endforeach
        </div>
    </div>

    <div class="flex flex-1 flex-col p-5 justify-start text-center space-y-5">
        <div>
            <div class="font-bold text-primary">{{ $job->compensation }}</div>
            <div class="text-sm">{{ $job->location }}</div>
        </div>
        <a class="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold" href="/jobs/{{ $job->id }}">Details</a>
    </div>
</x-panel>
