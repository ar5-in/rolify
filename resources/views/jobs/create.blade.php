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
        <x-section-heading>Create New Job</x-section-heading>
        <x-section>
            <x-form action="/jobs" method="post">
                <x-form.field id="employer_id" label="Select Employer">
                    <x-form.input id="employer_id" name="employer_id" type="selection" :options="$employerOptions" />
                </x-form.field>

                <x-form.field id="title" label="Job Title / Designation">
                    <x-form.input id="title" name="title" type="text" placeholder="Junior Frontend Developer" />
                </x-form.field>

                <x-form.field id="compensation" label="Compensation">
                    <x-form.input id="compensation" name="compensation" type="text" placeholder="$20,000 per year" />
                </x-form.field>

                <x-form.field id="location" label="Location">
                    <x-form.input id="location" name="location" type="selection" :options="$locationOptions" />
                </x-form.field>

                <x-form.field id="is_featured" label="Is Featured" type="checkbox">
                    <x-form.input id="is_featured" name="is_featured" type="checkbox" />
                </x-form.field>

                <x-form.field id="tags" label="Tags (separated by commas)" type="textarea">
                    <x-form.input id="tags" name="tags" type="textarea" placeholder="Laravel, web development, frontend" />
                </x-form.field>

                <x-form.controls>
                    <x-form.button label="Create Job" />
                    <x-form.button label="Cancel" href="/" />
                </x-form.controls>

            </x-form>
        </x-section>
    </article>
</x-layout>
