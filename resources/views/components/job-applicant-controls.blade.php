@props(['job'])
@if($jobApplication = $job->getApplicationFor(auth()->user()))
    <div class="p-5 border border-black/10 rounded-2xl">
        @php $statusClasses = ['approved' => 'bg-approved', 'rejected' => 'bg-rejected', 'pending' => 'bg-body-text'] @endphp
        <h3 class="mb-2 text-xl text-primary font-medium">
            Your Application <span class="text-sm px-4 py-1 rounded-full text-white {{ $statusClasses[$jobApplication->status] }}">{{ $jobApplication->status }}</span>
        </h3>
        <p>You applied to this job {{ $jobApplication->created_at->diffForHumans() }}</p>

        <div class="my-4 p-3 border border-black/10 rounded-xl">
            <h4 class="mb-1 text-sm text-primary font-medium">Cover Letter</h4>
            @if($jobApplication->status === 'pending' && auth()->user()->can('update-cover-letter', $jobApplication))
            <x-form action="/applications/{{ $jobApplication->id }}" method="patch">
                <x-form.field id="cover_letter" label="Update cover letter">
                    <x-form.input id="cover_letter" name="cover_letter" type="textarea" value="{{ $jobApplication->cover_letter }}" />
                </x-form.field>
                <x-form.button label="Save" />
            </x-form>
            @else
            {{ $jobApplication->cover_letter }}
            @endif
        </div>
        @can('update', $jobApplication)
        <x-form action="/applications/{{ $jobApplication->id }}" method="delete">
            <x-form.button label="Withdraw Application" />
        </x-form>
        @endcan
    </div>
@else
    @can('create', \App\Models\JobApplication::class)
        <div class="flex mt-5 justify-between">
            <a class="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer" href="/jobs/{{ $job->id }}/apply">Apply Now</a>
        </div>
    @endcan
@endif
