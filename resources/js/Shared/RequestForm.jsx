import Form from "@/Shared/Form/Form.jsx";

export default function RequestForm({ action, method, onResolve, onError, children, wide }) {
    const onSubmit = (form) => {
        // send request
        console.log(form);
        axios({
            url: form.action,
            method: form.method,
            data: form.data
        }).then((response) => {
            if(onResolve)
            {
                onResolve(response);
            }
        }).catch((error) => {
            if(onError)
            {
                onError(error.response.data);
            }
        })
        // handle response
        // callbacks
    }
    return (
        <Form action={action} method={method} onSubmit={onSubmit.bind(this)} wide={wide}>
            {children}
        </Form>
    )
}
