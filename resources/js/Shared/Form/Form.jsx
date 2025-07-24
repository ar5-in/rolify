import {FormDisabledContext, FormErrorsContext} from "@/Shared/Form/FormContext.jsx";

export default function Form({onSubmit, action = '', method = 'get', children, wide, errors = {}, disabled = false}) {
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if(disabled)
        {
            return;
        }

        const form = event.target;
        const formData = new FormData(form);
        const values = Object.fromEntries(formData);

        if (onSubmit) {
            onSubmit({
                action: form.action,
                method: method,
                data: values
            });
        }
    }

    return (
        <FormErrorsContext value={errors}>
            <FormDisabledContext value={disabled}>
                <form action={action} method={method.toLowerCase() !== 'get' ? 'post' : 'get'}
                      onSubmit={handleFormSubmit.bind(this)} className={wide === undefined ? 'md:w-100' : ''}>
                    {children}
                </form>
            </FormDisabledContext>
        </FormErrorsContext>
    )
}
