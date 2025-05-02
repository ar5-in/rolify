import NotificationsContainer from "@/Shared/Notifications/NotificationsContainer.jsx";
import NotificationItem from "@/Shared/Notifications/NotificationItem.jsx";
import {useContext, useEffect} from "react";
import {
    NotificationsContext,
    NotificationsDispatchContext,
    useNotifications
} from "@/Shared/Notifications/NotificationsContext.jsx";

export default function Notifications() {
    const {notifications} = useNotifications();

    return <>
        <NotificationsContainer>
            {notifications ? notifications.map(notification => <NotificationItem key={notification.id} notification={notification} />) : null}
        </NotificationsContainer>
    </>
}
