@props([
    'href' => '#',
    'src' => '',
    'text' => ''
])
<a class="inline-block rounded-full" href="{{ $href }}">
    <img class="inline-block rounded-full" src="{{ $src }}" alt="{{ $text }}">
</a>
