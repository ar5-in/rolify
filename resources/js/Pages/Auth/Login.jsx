import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import FormAction from "@/Shared/Form/FormAction.jsx";

export default function Login({}) {
    const addNotification = useAddNotification();

    const handleResolve = (response) => {
        const user = response.data && response.data.user ? response.data.user : null;
        const redirectTo = response.data && response.data.intended ? response.data.intended : '/';
        const message = user ? `Welcome ${user.name}. Logged successfully` : "Logged in successfully";
        addNotification({message:message, type:"success"});
        router.visit(redirectTo);
    }

    return (
        <Page heading="Login">
            <RequestForm action="/login" method="post" onResolve={handleResolve.bind(this)}>

                <FormControl label="Email" name="email" type="email"
                             placeholder="Email Address" />

                <FormControl label="Password" name="password" type="password"
                             placeholder="Password" />

                <FormActionGroup>
                    <FormAction label="Login" />
                    <FormAction type="link" variant="alternate" label="Register" href="/register" />
                </FormActionGroup>
            </RequestForm>
        </Page>
    )
}
