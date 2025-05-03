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
                <main>
                    <section className="m-5 space-y-5">
                        {children}
                    </section>
                </main>
                <Notifications/>
            </NotificationProvider>
        </SavedJobsProvider>
    </>
}

