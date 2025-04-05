<x-layout>
    <article>
        <x-section-heading>Featured Jobs</x-section-heading>
        <section class="m-5 space-y-5">
            @foreach($featuredJobs as $job)
            <x-card-job-wide :$job />
            @endforeach
        </section>
    </article>
    <x-job-listings :$jobs />
</x-layout>
