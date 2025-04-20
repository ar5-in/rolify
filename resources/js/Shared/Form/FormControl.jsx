import {useState} from "react";

export default function FormControl({
    label = 'Label',
    type = 'text',
    id,
    name,
    initialValue = '',
    options = [],
    checked,
    placeholder,
    error
}) {
    id = id ?? name;

    const [value, setValue] = useState(initialValue);
    const [isChecked, setIsChecked] = useState(checked ?? false);

    const onChange = (event) => {
        setIsChecked(event.target.checked);
        setValue(event.target.value);
    }

    const errorMessage = error ? <div className="px-3 py-1 text-red-600 text-sm">{error}</div> : '';

    let control;
    switch(type)
    {
        case 'checkbox': case 'radio':
        control = <>
            <label htmlFor={id} className="flex gap-2 mt-2 mb-4 px-0.5 text-sm">
                <input id={id} name={name} type={type} onChange={onChange.bind(this)}
                       value={value} placeholder={placeholder} className="" checked={isChecked} />
                {label}
            </label>
        </>
            break;

        case 'select':
            control = <>
                <label htmlFor={name} className="flex gap-2 mb-2 px-0.5 text-sm">{label}</label>
                <select id={id} name={name} onChange={onChange.bind(this)}
                        value={value} className="px-3 py-1.5 border-1 border-slate-500 rounded-lg text-primary">
                    <option>Choose One</option>
                    {options.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                </select>
            </>
            break;

        default:
            control = <>
                <label htmlFor={name} className="flex gap-2 mb-2 px-0.5 text-sm">{label}</label>
                <input id={id} name={name} type={type} onChange={onChange.bind(this)}
                       value={value} placeholder={placeholder} className="px-3 py-1.5 border-1 border-slate-500 rounded-lg text-primary" />
            </>
    }

    return (
        <div className="flex flex-col my-3 mb-5">
            {control}
            {errorMessage}
        </div>
    )
}
