import SiteHeader from "../Shared/SiteHeader";
import {
    NotificationProvider,
} from "@/Shared/Notifications/NotificationsContext.jsx";
import Notifications from "@/Shared/Notifications/Notifications.jsx";
import {SavedJobsProvider} from "@/Shared/SavedJobs/SavedJobsContext.jsx";

export default function Layout({children}) {
    return <>
        <SavedJobsProvider>
            <NotificationProvider>
                <SiteHeader/>
                <main>{children}</main>
                <Notifications/>
            </NotificationProvider>
        </SavedJobsProvider>
    </>
}

