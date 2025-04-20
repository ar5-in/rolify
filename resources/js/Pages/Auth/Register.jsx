import {useState} from "react";
import {router} from "@inertiajs/react";
import Page from "@/Shared/Page.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActions from "@/Shared/Form/FormActions.jsx";
import Button from "@/Shared/Button.jsx";

export default function Register({roles}) {
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
        <Page heading="Register">
            <RequestForm action="/register" method="post" onResolve={handleResolve.bind(this)} onError={handleError.bind(this)}>

                <FormControl label="Choose a Role" name="role_id"
                             type="select" options={roles.map(role => ({label: role.title, value: role.id}))}
                             placeholder="Select a role" error={errors['role_id']} />

                <FormControl label="Name" name="name" type="text"
                             placeholder="Your Name" error={errors['name']} />

                <FormControl label="Email" name="email" type="email"
                             placeholder="Email Address" error={errors['email']} />

                <FormControl label="Password" name="password" type="password"
                             placeholder="Password" error={errors['password']}  />

                <FormControl label="Confirm Password" name="password_confirmation" type="password"
                             placeholder="Confirm Password" error={errors['password_confirmation']}  />
                <FormControl label="I agree to the terms" id="wants_newsletter_subscription-1"
                             name="has_agreed" type="checkbox"
                             error={errors['wants_newsletter_subscription']} />
                <FormActions>
                    <Button label="Register" />
                    <Button type="link" label="Login" href="/login" />
                </FormActions>

            </RequestForm>
        </Page>
    )
}
