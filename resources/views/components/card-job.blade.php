@props(['job'])
<x-panel class="flex flex-col [&:nth-child(1n)>div:first-child]:bg-[#ffe1cb] [&:nth-child(2n)>div:first-child]:bg-[#d5f6ed] [&:nth-child(3n)>div:first-child]:bg-[#e2dbf9] [&:nth-child(4n)>div:first-child]:bg-[#e0f3ff] [&:nth-child(5n)>div:first-child]:bg-[#fbe2f3] [&:nth-child(6n)>div:first-child]:bg-[#eceff5]">
    <div class="flex-1 flex flex-col p-5 rounded-xl space-y-5">
        <div class="flex justify-between items-center">
            <div class="bg-body-bg px-2 py-1 rounded-full text-sm font-medium text-primary">{{ $job->created_at->format('M d, Y') }}</div>
            <x-toggle-saved-job :$job />
        </div>
        <div class="">
            <div class="">
                <div class="mb-1 text-xs font-bold text-primary">{{ $job->employer->name }}</div>
                <img class="inline-block rounded-full float-right" src="{{ $job->employer->logo_url }}" alt="{{ $job->employer->name }} Logo">
                <h2 class="text-2xl font-medium text-primary break-words">{{ $job->title }}</h2>
            </div>
        </div>
        <div class="flex flex-wrap items-start mt-auto space-x-2 space-y-2">
            @foreach($job->tags as $tag)
                <x-tag :$tag />
            @endforeach
        </div>
    </div>

    <div class="flex p-5 justify-between items-end space-x-1">
        <div>
            <div class="font-bold text-primary">{{ $job->compensation }}</div>
            <div class="text-sm">{{ $job->location }}</div>
        </div>
        <a class="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold" href="/jobs/{{ $job->id }}">Details</a>
    </div>
</x-panel>
