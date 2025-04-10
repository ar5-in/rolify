<x-layout>
    <article>
        <x-section-heading>Job Application</x-section-heading>
        <section class="m-5 space-y-5">
            @foreach($jobApplications as $jobApplication)
                <div>
                    <h3><a href="{{ url('/jobs/' . $jobApplication->job->id) }}">{{ $jobApplication->job->title }}</a></h3>
                    <p>Applied {{ $jobApplication->created_at->diffForHumans() }}</p>
                </div>
            @endforeach
        </section>
    </article>
</x-layout>
