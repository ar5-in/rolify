import {createContext, useContext, useEffect, useReducer, useRef} from "react";

export const NotificationsContext = createContext([]);
export const NotificationsDispatchContext = createContext(() => []);

export function useAddNotification() {
    const dispatch = useContext(NotificationsDispatchContext);

    return ({
        message,
        type = 'info',
        timeout = 3000
            }) => {

        if(!message)
        {
            throw Error("useAddNotification: message is required");
        }

        dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
                message: message,
                type: type,
                timeout: timeout
            }
        });
    }
}

export function useNotifications() {
    const notifications = useContext(NotificationsContext);
    const dispatch = useContext(NotificationsDispatchContext);

    const removeNotification = (id) => dispatch({
        type: 'REMOVE_NOTIFICATION',
        payload: id
    });

    return {
        notifications: notifications,
        removeNotification: removeNotification
    };
}

export function NotificationProvider({children}) {
    const [notifications, dispatch] = useReducer(
        notificationsReducer,
        initialNotifications,
    );

    return <NotificationsContext.Provider value={notifications}>
        <NotificationsDispatchContext.Provider value={dispatch}>
            {children}
        </NotificationsDispatchContext.Provider>
    </NotificationsContext.Provider>
}

function notificationsReducer(notifications, action) {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            action.payload.id = newId++;
            action.payload.type = action.payload.type ?? 'info';
            action.payload.createdAt = Date.now();
            action.payload.timeout = action.payload.timeout ?? 3000;

            return [...notifications, action.payload];

        case 'REMOVE_NOTIFICATION':
            return notifications.filter(notification => notification.id !== action.payload);

        default:
            return notifications;
    }

}

let newId = 1;
const initialNotifications = [];
