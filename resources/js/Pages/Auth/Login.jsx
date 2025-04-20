import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActions from "@/Shared/Form/FormActions.jsx";
import Button from "@/Shared/Button.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useState} from "react";

export default function Login({}) {
    const [errors, setErrors] = useState({});

    const handleResolve = (response) => {
        router.visit('/');
    }
    const handleError = (response) => {
        if(response.errors)
        {
            setErrors(response.errors);
        }
    }

    return (
        <Page heading="Login">
            <RequestForm action="/login" method="post" onResolve={handleResolve.bind(this)} onError={handleError.bind(this)}>

                <FormControl label="Email" name="email" type="email"
                             placeholder="Email Address" error={errors['email']} />

                <FormControl label="Password" name="password" type="password"
                             placeholder="Password" error={errors['password']}  />

                <FormActions>
                    <Button label="Login" />
                    <Button type="link" label="Register" href="/register" />
                </FormActions>
            </RequestForm>
        </Page>
    )
}
