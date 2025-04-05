@props(['tag'])
<a
    {{ $attributes->merge(['class' => 'inline-flex px-4 py-1 border border-black/20 rounded-full text-xs font-bold text-primary hover:bg-black/5 hover:border-black/25']) }}
    href="tags/{{ $tag->id }}"
>
    {{ $tag->name }}
</a>
