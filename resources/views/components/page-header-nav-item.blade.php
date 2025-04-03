@props(['active' => false])
<a {{ $attributes->merge(['class' => 'cursor-pointer px-7 flex items-center ' . ($active ? 'border-b-2 border-b-header-text' : 'border-b-2 border-b-transparent hover:border-b-header-text/80 transition-colors duration-300')]) }}>{{ $slot }}</a>
