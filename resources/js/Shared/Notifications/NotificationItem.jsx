import {useNotifications} from "@/Shared/Notifications/NotificationsContext.jsx";
import {useEffect, useState} from "react";

export default function NotificationItem({notification}) {
    const [isHidden, setIsHidden] = useState(false);
    const {removeNotification} = useNotifications();
    const typeBackgrounds = {
        info: 'bg-blue-600',
        success: 'bg-green-700',
        error: 'bg-amber-700'
    };

    const hideNotification = () => {
        setIsHidden(true);
    }

    const handleAnimationEnd = () => {
        if(isHidden)
        {
            removeNotification(notification.id);
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            hideNotification();
        }, notification.timeout);

        return () => clearTimeout(timeoutId);
    }, []);

    return <>
        <div
            className={`flex justify-between text-white ${typeBackgrounds[notification.type] ?? 'bg-primary'} ${isHidden ? 'animate-notification-hide' : 'animate-notification-show'}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <p className="px-4 py-2">{notification.message}</p>
            <button className="px-4 py-2 hover:bg-black/10 cursor-pointer" onClick={() => hideNotification()}>&times;</button>
        </div>
    </>
}
