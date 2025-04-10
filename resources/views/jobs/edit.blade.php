@php
    $employerOptions = ['' => 'Choose One'];
    foreach($employers as $employer)
    {
        $employerOptions[$employer->id] = $employer->name;
    }

    $locationOptions = [
        '' => 'Choose One',
        'New York' => 'New York',
        'Los Angeles' => 'Los Angeles',
        'Florida' => 'Florida',
    ];
@endphp
<x-layout>
    <article>
        <x-section-heading>Edit Job: {{ $job->title }}</x-section-heading>
        <x-section>
            <x-form action="/jobs/{{ $job->id }}" method="patch">
                <x-form.field id="employer_id" label="Select Employer">
                    <x-form.input id="employer_id" name="employer_id" type="selection" :options="$employerOptions" :value="$job->employer->id" />
                </x-form.field>

                <x-form.field id="title" label="Job Title / Designation">
                    <x-form.input id="title" name="title" type="text" placeholder="Junior Frontend Developer" :value="$job->title" />
                </x-form.field>

                <x-form.field id="compensation" label="Compensation">
                    <x-form.input id="compensation" name="compensation" type="text" placeholder="$20,000 per year" :value="$job->compensation" />
                </x-form.field>

                <x-form.field id="location" label="Location">
                    <x-form.input id="location" name="location" type="selection" :options="$locationOptions" :value="$job->location" />
                </x-form.field>

                <x-form.field id="is_featured" label="Is Featured" type="checkbox">
                    <x-form.input id="is_featured" name="is_featured" type="checkbox" :checked="$job->is_featured" />
                </x-form.field>

                <x-form.field id="tags" label="Tags (separated by commas)" type="textarea">
                    <x-form.input id="tags" name="tags" type="textarea" placeholder="Laravel, web development, frontend" :value="$job->tags()->pluck('name')->implode(', ')" />
                </x-form.field>

                <x-form.controls>
                    <x-form.button label="Update Job" />
                    <x-form.button label="Cancel" href="/" />
                    @can('delete', $job)
                    <button form="delete-job" class="ml-auto text-red-600 px-6 py-2 rounded-full text-lg font-bold cursor-pointer">Delete Job</button>
                    @endcan
                </x-form.controls>

            </x-form>
            @can('delete', $job)
            <form id="delete-job" action="/jobs/{{ $job->id }}" method="post">
                @csrf
                @method('DELETE')
            </form>
            @endcan
        </x-section>
    </article>
</x-layout>
