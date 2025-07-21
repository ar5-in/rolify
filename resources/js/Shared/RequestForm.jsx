import Form from "@/Shared/Form/Form.jsx";
import {useState} from "react";

export default function RequestForm({ action, method, onResolve, onError, children, wide, disabled = false }) {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const isFormDisabled = disabled || isLoading;
    const onSubmit = (form) => {
        // send request
        //return console.log(form);
        setIsLoading(true);
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
        }).finally(() => {
            setIsLoading(false);
        })
        // handle response
        // callbacks
    }
    return (
        <Form disabled={isFormDisabled} action={action} method={method} onSubmit={onSubmit.bind(this)} wide={wide} errors={errors}>
            {children}
            {isLoading ? <svg className="m-3 size-5 animate-spin" fill="#141414" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
            </svg> : ''}
        </Form>
    )
}
