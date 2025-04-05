@props(['tag'])
<a {{ $attributes->merge(['class' => 'inline-flex px-4 py-1 border border-body-text/50 rounded-full text-xs font-bold text-body-text']) }}>
    {{ $tag->name }}
</a>
