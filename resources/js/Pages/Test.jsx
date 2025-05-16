import PageHeading from "../Shared/PageHeading";
import Button from "@/Shared/Button.jsx";
import {useContext} from "react";
import {
    NotificationsContext,
    useAddNotification
} from "@/Shared/Notifications/NotificationsContext.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";

let timeout = 1000;

export default function Test({}) {
    const notifications = useContext(NotificationsContext);
    const addNotification = useAddNotification();

    return <>
        <PageHeading>This is a test page</PageHeading>
        <p>Welcome to the test page</p>
        <FormActionGroup>
            <Button label="Push Notification" onClick={() => addNotification({
                timeout: timeout += 1000,
                message:'message timeout = ' + timeout
            })}/>
        </FormActionGroup>
        <pre className="m-2 p-4 border border-black/10">
            {JSON.stringify(notifications, null, 4)}
        </pre>
    </>
}
