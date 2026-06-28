import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import FormAction from "@/Shared/Form/FormAction.jsx";
import Card from "../../Shared/Card.jsx";
import {useState} from "react";
import FloatingDemoDataButton from "../../Shared/FloatingDemoDataButton.jsx";

export default function Login({}) {
    const addNotification = useAddNotification();

    const handleResolve = (response) => {
        const user = response.data && response.data.user ? response.data.user : null;
        const redirectTo = response.data && response.data.intended ? response.data.intended : '/';
        const message = user ? `Welcome ${user.name}. Logged successfully` : "Logged in successfully";
        addNotification({message: message, type: "success"});
        router.visit(redirectTo);
    }

    const [emailKey, setEmailKey] = useState(0);
    const [emailValue, setEmailValue] = useState('');

    const [passwordKey, setPasswordKey] = useState(0);
    const [passwordValue, setPasswordValue] = useState('');

    const setLoginCredentials = (email, password) => {
        setEmailValue(email);
        setEmailKey(key => key+1);
        setPasswordValue(password);
        setPasswordKey(key=> key+1);
    }

    return (
        <div className={`mx-auto max-w-xl`}>
            <Page heading="Login">

                <RequestForm wide action="/login" method="post" onResolve={handleResolve.bind(this)}>
                    <Card>
                        <div className={`p-3 bg-transparent border border-black/10 rounded-xl`}>
                            <>
                                <FormControl key={emailKey} label="Email" name="email" type="email"
                                             placeholder="Email Address" initialValue={emailValue} />
                            </>
                            <>
                                <FormControl key={passwordKey} label="Password" name="password" type="password"
                                             placeholder="Password" initialValue={passwordValue} />
                            </>
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
            <FloatingDemoDataButton
                onClick={(data) => setLoginCredentials(data.email, data.password)}
            />
        </div>
    )
}
