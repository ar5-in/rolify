export default function NotificationsContainer({children}) {
    return <>
        <div className="fixed bottom-0 left-0 z-10 p-2 space-y-1">{children}</div>
    </>
}
