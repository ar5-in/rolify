@if(session()->has('global_message_success'))
    <div class="mx-5">
        <div class="flex gap-2 items-center justify-between pl-4 pr-2 py-2 m-2 border border-green-600 rounded-lg bg-green-50 text-lg text-green-600">
            <p>{{ session()->get('global_message_success') }}</p>
            <a class="flex items-center justify-center bg-green-600 text-white w-7 h-7 rounded-full" href="javascript:window.location.reload()">&times;</a>
        </div>
    </div>
@endif

@if(session()->has('global_message_error'))
    <div class="mx-5">
        <div class="flex gap-2 items-center justify-between pl-4 pr-2 py-2 m-2 border border-red-600 rounded-lg bg-red-50 text-lg text-red-600">
            <p>{{ session()->get('global_message_error') }}</p>
            <a class="flex items-center justify-center bg-red-600 text-white w-7 h-7 rounded-full" href="javascript:window.location.reload()">&times;</a>
        </div>
    </div>
@endif
