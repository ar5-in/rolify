import {router} from "@inertiajs/react";
import Page from "@/Shared/Page.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";
import FormAction from "@/Shared/Form/FormAction.jsx";

export default function Register({roles}) {

    const handleResolve = (response) => {
        router.visit('/');
    }

    return (
        <Page heading="Register">
            <RequestForm action="/register" method="post" onResolve={handleResolve.bind(this)}>

                <FormControl label="Choose a Role" name="role_id"
                             type="select" options={roles.map(role => ({label: role.title, value: role.id}))}
                             placeholder="Select a role" />

                <FormControl label="Name" name="name" type="text"
                             placeholder="Your Name" />

                <FormControl label="Email" name="email" type="email"
                             placeholder="Email Address" />

                <FormControl label="Password" name="password" type="password"
                             placeholder="Password" />

                <FormControl label="Confirm Password" name="password_confirmation" type="password"
                             placeholder="Confirm Password" />
                <FormControl label="I agree to the terms" id="wants_newsletter_subscription-1"
                             name="has_agreed" type="checkbox"
                             />
                <FormActionGroup>
                    <FormAction label="Register" />
                    <FormAction type="link" variant="alternate" label="Login" href="/login" />
                </FormActionGroup>

            </RequestForm>
        </Page>
    )
}
