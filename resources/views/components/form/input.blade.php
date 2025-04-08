@props(['type'=>'text', 'value'=>'', 'name'=>'', 'options' => []])
@if($type === 'textarea')
<textarea name="{{ $name }}" {{ $attributes->merge(['class' => 'px-3 py-1.5 border-1 border-slate-500 rounded-lg text-primary']) }}>{{ $value }}</textarea>
@elseif($type === 'selection')
    <select name="{{ $name }}" {{ $attributes->merge(['class' => 'px-3 py-1.5 border-1 border-slate-500 rounded-lg text-primary']) }}>
        @foreach($options as $optionValue => $text)
        <option value="{{ $optionValue }}" {{ old($name, $value) === (string)$optionValue ? 'selected' : '' }}>{{ $text }}</option>
        @endforeach
    </select>
@else
<input name="{{ $name }}" type="{{ $type }}" value="{{ old($name, $value) }}" {{ $attributes->merge(['class' => 'px-3 py-1.5 border-1 border-slate-500 rounded-lg text-primary']) }}>
@endif
