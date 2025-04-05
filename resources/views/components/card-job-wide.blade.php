@props(['job'])
<x-panel class="flex">
    <div class="flex flex-1 items-start bg-gray-300 p-5 rounded-xl space-x-5">
        <div class="flex flex-col-reverse justify-end items-center gap-2">
            <div class="bg-body-bg px-2 py-1 rounded-full text-sm font-medium text-primary">{{ $job->created_at->format('M d, Y') }}</div>
            <div><img class="inline-block rounded-full" src="https://placehold.co/44x44" alt="Save Job"></div>
        </div>
        <div class="flex flex-2 space-x-2">
            <div class="shrink-0">
                <img class="inline-block rounded-full float-right" src="{{ $job->employer->logo_url }}" alt="{{ $job->employer->name }} Logo">
            </div>
            <div class="mt-2.5">
                <div class="mb-1 text-sm font-bold text-primary">{{ $job->employer->name }}</div>
                <h2 class="text-3xl font-bold text-primary">{{ $job->title }}</h2>
            </div>
        </div>
        <div class="flex flex-1 flex-wrap items-start space-x-2 space-y-2">
            @foreach($job->tags as $tag)
                <x-tag :$tag />
            @endforeach
        </div>
    </div>

    <div class="flex flex-col p-5 justify-start text-center space-y-5">
        <div>
            <div class="font-bold text-primary">{{ $job->compensation }}</div>
            <div class="text-sm">{{ $job->location }}</div>
        </div>
        <a class="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold" href="/jobs/{{ $job->id }}">Details</a>
    </div>
</x-panel>
