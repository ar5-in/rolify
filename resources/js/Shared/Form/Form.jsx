export default function Form({onSubmit, action='', method = 'get', children, wide}) {

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const values = Object.fromEntries(formData);

        if(onSubmit)
        {
            onSubmit({
                action: form.action,
                method: method,
                data: values
            });
        }
    }

    return (
        <form action={action} method={method.toLowerCase() !== 'get' ? 'post' : 'get'} onSubmit={handleFormSubmit.bind(this)} className={wide === undefined ? 'w-100' : ''}>
            {children}
        </form>
    )
}
