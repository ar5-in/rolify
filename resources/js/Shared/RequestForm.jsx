import Form from "@/Shared/Form/Form.jsx";
import {useState} from "react";

export default function RequestForm({ action, method, onResolve, onError, children, wide, disabled = false }) {
    const [errors, setErrors] = useState({});
    const onSubmit = (form) => {
        // send request
        //return console.log(form);
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
            if(error.response.data.errors)
            {
                setErrors(error.response.data.errors);
            }

            if(onError)
            {
                onError(error.response.data);
            }
        })
        // handle response
        // callbacks
    }
    return (
        <Form disabled={disabled} action={action} method={method} onSubmit={onSubmit.bind(this)} wide={wide} errors={errors}>
            {children}
        </Form>
    )
}
