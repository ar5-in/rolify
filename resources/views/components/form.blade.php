@props(['method' => 'get', 'width' => 'full'])
@php
    $methodHTML = in_array(strtolower($method), ['get', 'post']) ? strtolower($method) : 'post';
@endphp
<form {{ $attributes(['method' => $methodHTML, 'class' => $width !== 'full' ? 'w-100' : '']) }}>
    @if($method !== 'get')
        @csrf
        @if($method !== 'post')@method(strtolower($method))@endif
    @endif
    {{ $slot }}
</form>
