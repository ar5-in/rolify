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

            @can('view-job-applications', $job)
            <div class="mt-5 pt-2 border-t border-t-black/10">
                <h3 class="my-3 text-lg font-bold text-primary">Applications</h3>
                @if($job->applications->isEmpty())
                <div class="p-10 text-2xl text-center font-medium text-black/20">
                    No application received yet
                </div>
                @else
                    @foreach($job->applications as $jobApplication)
                        <div class="p-5 border border-black/10 rounded-2xl">
                            <h4 class="mb-2 text-xl font-medium">Applicant: <span class="text-primary">{{ $jobApplication->user->name }} ({{ $jobApplication->user->email }})</span></h4>
                            <h5 class="mb-1 text-sm text-primary font-medium">Cover letter</h5>

                            {{ $jobApplication->cover_letter }}

                            @can('update-status', $jobApplication)
                            @if($jobApplication->status === 'pending')
                            <div class="flex gap-2 mt-5 pt-5 border-t border-t-black/10">
                                <x-form action="{{ url('/applications/' . $jobApplication->id) }}" method="patch">
                                    <input type="hidden" name="status" value="approved">
                                    <button class="bg-green-800 text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer">Approve Application</button>
                                </x-form>

                                <x-form action="{{ url('/applications/' . $jobApplication->id) }}" method="patch">
                                    <input type="hidden" name="status" value="rejected">
                                    <button class="bg-amber-900 text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer">Reject Application</button>
                                </x-form>
                            </div>
                            @else
                                @php $statusClasses = ['approved' => 'text-approved', 'rejected' => 'text-rejected'] @endphp
                                <div class="mt-5 pt-5 border-t border-t-black/10 {{ $statusClasses[$jobApplication->status] }}">You {{ $jobApplication->status }} the application</div>
                            @endif
                            @endcan


                        </div>
                    @endforeach
                @endif
            </div>
            @endcan

            <x-job-applicant-controls :$job />
        </x-section>
    </article>
</x-layout>
