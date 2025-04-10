@php use Illuminate\Database\Eloquent\Builder; @endphp
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

            @can('update', $job)
            <div class="flex mt-5 justify-between">
                <a class="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer" href="/jobs/{{ $job->id }}/edit">Edit Job</a>
            </div>
            @endcan

            @if($jobApplication = $job->getApplicationFor(auth()->user()))
                <div class="p-5 border border-black/10 rounded-2xl">
                    <h3 class="mb-2 text-xl text-primary font-medium">Your Application <span class="text-sm px-4 py-1 bg-black/10 rounded-full ">{{ $jobApplication->status }}</span></h3>
                    <p>You applied to this job {{ $jobApplication->created_at->diffForHumans() }}</p>

                    <div class="my-4 p-3 border border-black/10 rounded-xl">
                        <h4 class="mb-1 text-sm text-primary font-medium">Cover Letter</h4>
                        {{ $jobApplication->cover_letter }}
                    </div>

                    <x-form action="/applications/{{ $jobApplication->id }}" method="delete">
                        <x-form.button label="Withdraw Application" />
                    </x-form>
                </div>
            @else
            @can('create', \App\Models\JobApplication::class)
                <div class="flex mt-5 justify-between">
                    <a class="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer" href="/jobs/{{ $job->id }}/apply">Apply Now</a>
                </div>
            @endcan
            @endif
        </x-section>
    </article>
</x-layout>
