@props(['label' => 'Button'])
@php
    $buttonStyles = 'inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer';
    $linkStyles = 'inline-block text-primary hover:bg-black/10 px-6 py-2 rounded-full text-lg font-bold transition-colors duration-300';
@endphp
@if($attributes->has('href'))
    <a {{ $attributes->merge(['class' => $linkStyles]) }}>{{ $label }}</a>
@else
    <button {{ $attributes->merge(['class' => $buttonStyles]) }}>{{ $label }}</button>
@endif
