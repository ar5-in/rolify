<x-layout>
    <article>
        <header class="flex justify-between mx-5 my-9">
            <div class="flex space-x-4 items-center">
                <h1 class="text-3xl font-bold text-primary">Featured Job</h1>
            </div>

        </header>
        <section class="m-5 space-y-5">
            @foreach($featuredJobs as $job)
            <x-card-job-wide :$job />
            @endforeach
        </section>
    </article>
    <x-job-listings :$jobs />
</x-layout>
