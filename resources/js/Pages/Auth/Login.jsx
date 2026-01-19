import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import FormAction from "@/Shared/Form/FormAction.jsx";
import Card from "../../Shared/Card.jsx";
import CardFooter from "../../Shared/CardFooter.jsx";
import CardHead from "../../Shared/CardHead.jsx";

export default function Login({}) {
    const addNotification = useAddNotification();

    const handleResolve = (response) => {
        const user = response.data && response.data.user ? response.data.user : null;
        const redirectTo = response.data && response.data.intended ? response.data.intended : '/';
        const message = user ? `Welcome ${user.name}. Logged successfully` : "Logged in successfully";
        addNotification({message: message, type: "success"});
        router.visit(redirectTo);
    }

    return (
        <div className={`mx-auto max-w-xl`}>
            <Page heading="Login">

                <RequestForm wide action="/login" method="post" onResolve={handleResolve.bind(this)}>
                    <Card>
                        <div className={`p-3 bg-transparent border border-black/10 rounded-xl`}>
                            <FormControl label="Email" name="email" type="email"
                                         placeholder="Email Address"/>

                            <FormControl label="Password" name="password" type="password"
                                         placeholder="Password"/>
                        </div>
                        <div className={`px-3 py-5`}>
                            <FormActionGroup>
                                <FormAction label="Login"/>
                                <FormAction type="link" variant="alternate" label="Register" href="/register"/>
                            </FormActionGroup>
                        </div>
                    </Card>
                </RequestForm>

            </Page>
        </div>
    )
}
