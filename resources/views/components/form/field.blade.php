@props([
    'id' => 'field',
    'label' => '',
    'type' => 'text'
])
<div class="flex flex-col my-3 mb-5">
    @if($type === 'checkbox' || $type === 'radio')
        <x-form.label :$label :$id>
            {{ $slot }}
        </x-form.label>
    @else
        @if($label !== '')
            <x-form.label :$label :$id />
        @endif
        {{ $slot }}
    @endif
    @error($id)
        <div class="px-3 py-1 text-red-600 text-sm">
            {{ $message }}
        </div>
    @enderror
</div>
