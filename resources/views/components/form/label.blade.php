@props([
    'id' => 'field',
    'label' => 'Form Label'
    ])
<label for="{{ $id }}" {{ $attributes->merge(['class' => 'flex gap-2 mb-2 px-0.5 text-sm']) }}>{{ $slot }}{{ $label }}</label>
