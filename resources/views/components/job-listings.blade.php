@props([
    'variant' => 'standard',
    'title' => 'Job Listings',
    'jobs'
])
<article>
    <header class="flex justify-between mx-5 my-9">
        <div class="flex space-x-4 items-center">
            <h1 class="text-3xl font-bold text-primary">{{ $title }}</h1>
            <span class="inline-flex px-4 py-1 border border-body-text rounded-full text-lg font-bold text-primary">{{ $jobs->count() }}</span>
        </div>

        <div>Sorted by Newest First</div>
    </header>
    <section class="{{ $variant !== 'wide' ? 'grid gap-6 lg:grid-cols-4' : 'space-y-5' }} m-5">
        @foreach($jobs as $job)
            @if($variant === 'wide')
                <x-card-job-wide :$job />
            @else
                <x-card-job :$job />
            @endif
        @endforeach
    </section>
</article>
