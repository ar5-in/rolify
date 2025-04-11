@php $statusClasses = ['approved' => 'bg-approved', 'rejected' => 'bg-rejected', 'pending' => 'bg-body-text'] @endphp
<x-layout>
    <article>
        <x-section-heading>Job Application</x-section-heading>
        <section class="m-5 space-y-5">
            @foreach($jobApplications as $jobApplication)
                <div class="pt-5 border-t border-t-black/10">
                    <h3 class="font-medium text-xl text-primary">
                        <a href="{{ url('/jobs/' . $jobApplication->job->id) }}">{{ $jobApplication->job->title }}</a>
                        <span class="text-sm px-4 py-1 rounded-full text-white {{ $statusClasses[$jobApplication->status] }}">{{ $jobApplication->status }}</span>
                    </h3>
                    <p>Applied {{ $jobApplication->created_at->diffForHumans() }}</p>
                </div>
            @endforeach
        </section>
    </article>
</x-layout>
