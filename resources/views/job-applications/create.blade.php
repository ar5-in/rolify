<x-layout>
    <article>
        <x-section-heading>Apply for &quot;{{ $job->title }}&quot; Job</x-section-heading>
        <section class="m-5 space-y-5">
            <ul>
                <li>Employer: {{ $job->employer->name }}</li>
                <li>Compensation: {{ $job->compensation }}</li>
                <li>Location: {{ $job->location }}</li>
            </ul>


            <x-form action="/applications" method="POST">
                <input type="hidden" name="job_id" value="{{ $job->id }}" />
                <x-form.field id="cover_letter" label="Cover Letter" type="textarea">
                    <x-form.input id="cover_letter" name="cover_letter" type="textarea" placeholder="What makes you a perfect fit?" />
                </x-form.field>

                <x-form.controls>
                    <x-form.button label="Apply" />
                    <x-form.button label="Cancel" href="{{ url('/jobs/' . $job->id) }}" />
                </x-form.controls>
            </x-form>
        </section>
    </article>
</x-layout>
