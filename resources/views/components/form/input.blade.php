@props(['type'=>'text', 'value'=>''])
@if($type === 'textarea')
<textarea {{ $attributes->merge(['class' => 'px-3 py-1.5 border-1 border-slate-500 rounded-lg text-primary']) }}>{{ $value }}</textarea>
@else
<input type="{{ $type }}" value="{{ $value }}" {{ $attributes->merge(['class' => 'px-3 py-1.5 border-1 border-slate-500 rounded-lg text-primary']) }}>
@endif
