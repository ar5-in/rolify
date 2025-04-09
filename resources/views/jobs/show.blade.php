<x-layout>
    <article>
        <x-section-heading>{{ $job->title }} ({{ $job->employer->name }})</x-section-heading>
        <x-section>
            <div class="flex flex-1 flex-wrap items-start space-x-2 space-y-2">
                @foreach($job->tags as $tag)
                    <x-tag :$tag />
                @endforeach
            </div>

            <h3 class="text-xl">Compensation: <strong class="text-primary">{{ $job->compensation }}</strong></h3>
            <h3 class="text-xl">Location: <strong class="text-primary">{{ $job->location }}</strong></h3>

            <div class="flex mt-5 justify-between">
                <a class="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer" href="/jobs/{{ $job->id }}/edit">Edit Job</a>
            </div>
        </x-section>
    </article>
</x-layout>
