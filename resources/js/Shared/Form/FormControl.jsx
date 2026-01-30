import {useContext, useEffect, useState} from "react";
import {FormDisabledContext, FormErrorsContext} from "@/Shared/Form/FormContext.jsx";

export default function FormControl({
    label,
    type = 'text',
    id,
    name,
    initialValue = '',
    selectOption,
    options = [],
    checked = false,
    disabled = false,
    placeholder,
    withAction,
    actionLabel,
    actionDisabled,
    onAction,
    onSelection
}) {
    const errors = useContext(FormErrorsContext);
    const error = errors[name] ?? errors[name];
    const [hasError, setHasError] = useState(false);

    const formDisabled = useContext(FormDisabledContext);

    /* If `id` is not provided, use `name` as `id` */
    id = id ?? name;

    const isControlDisabled = disabled || formDisabled;

    const hasAction = withAction !== undefined;

    const controlClasses = hasAction
        ? `min-w-0 flex-1 px-3 py-1.5 border-1 ${hasError ? 'border-red-700' : 'border-slate-500'} rounded-l-lg text-primary text-md`
        : `px-3 py-1.5 border-1 ${hasError ? 'border-red-700' : 'border-slate-500'} rounded-lg text-primary text-md`;
    const disabledControlClasses = `disabled:opacity-50`;

    const [value, setValue] = useState(initialValue);
    const [isChecked, setIsChecked] = useState(checked ?? false);

    useEffect(() => {
        if (type === 'select' && onSelection) {
            onSelection(value);
        }
    }, [value]);

    useEffect(() => {
        setHasError(error !== undefined);
    }, [error]);

    useEffect(() => {
        if(selectOption !== undefined && selectOption !== null)
        {
            setValue(selectOption);
        }
    }, [selectOption]);

    const onChange = (event) => {
        setIsChecked(event.target.checked);
        setValue(event.target.value);
        setHasError(false);
    }

    const errorMessage = hasError ? <div className="px-3 py-1 text-red-600 text-sm">{error}</div> : '';
    const showLabel = type !== 'checkbox' && type !== 'radio';

    let control;
    switch (type) {
        case 'checkbox':
        case 'radio':
            control = <>
                <Label label={label} id={id}>
                    <input id={id} name={name} type={type} onChange={onChange.bind(this)} disabled={isControlDisabled}
                           value={value} placeholder={placeholder} className="" checked={isChecked}/>
                </Label>
            </>
            break;

        case 'select':
            control = <>
                <select id={id} name={name} onChange={onChange.bind(this)} disabled={isControlDisabled}
                        value={value} className={`${controlClasses} ${disabledControlClasses}`}>
                    <option value="">Choose One</option>
                    {options.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}
                </select>
            </>
            break;

        case 'textarea':
            control = <>
                <textarea id={id} name={name} onChange={onChange.bind(this)} rows={3}
                          value={value} placeholder={placeholder} disabled={isControlDisabled}
                          className={`${controlClasses} ${disabledControlClasses}`}/>
            </>
            break;

        default:
            control = <>
                <input id={id} name={name} type={type} onChange={onChange.bind(this)}
                       value={value} placeholder={placeholder} disabled={isControlDisabled}
                       className={`${controlClasses} ${disabledControlClasses}`}/>
            </>
    }

    return (
        <div className="flex flex-col my-3 mb-5 first:mt-0">
            {showLabel && <Label label={label} id={id}/>}
            {hasAction
                ? <ActionWrapper label={actionLabel} onClick={onAction} disabled={actionDisabled}>{control}</ActionWrapper>
                : control}
            {errorMessage}
        </div>
    )
}

function Label({id, label, children}) {
    if (!label) {
        return children;
    }

    return (
        <label htmlFor={id} className="flex gap-2 mb-2 px-0.5 text-sm">
            {children}
            {label}
        </label>
    )
}

function ActionWrapper({label, onClick, disabled, children}) {
    const classes = `px-3 py-1.5 border-1 border-slate-500 border-l-transparent rounded-r-lg
    text-primary text-md cursor-pointer disabled:opacity-50 disabled:cursor`;
    return (
        <div className={`flex`}>
            {children}
            <button
                type="button"
                className={classes}
                onClick={onClick}
                disabled={disabled}
            >{label}
            </button>
        </div>
    );
}
