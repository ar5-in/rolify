import {Link, router, usePage} from "@inertiajs/react";
import SiteNav from "@/Shared/SiteNav.jsx";
import SiteLogo from "@/Shared/SiteLogo.jsx";
import SiteNavLink from "@/Shared/SiteNavLink.jsx";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import {useEffect, useState} from "react";

export default function SiteHeader () {
    const {auth} = usePage().props;
    const addNotification = useAddNotification();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogoutClick = () => {
        router.delete('/logout');
        addNotification({
            message: "You have been logged out",
            type:"success"
        });
        setIsUserMenuOpen(false);
    }

    const guestControls = !auth.user ? <>
        <Link className="block hover:bg-white/10 px-4 py-2 transition-colors duration-300 text-center" onClick={() => (setIsUserMenuOpen(false))}
              href="/login">Login</Link>
        <Link className="block hover:bg-white/10 px-4 py-2 transition-colors duration-300 text-center" onClick={() => (setIsUserMenuOpen(false))}
              href="/register">Register</Link>
    </> : '';

    const userControls = auth.user ? <>
        <div className="text-sm mb-2 text-center">Welcome, {auth.user.name}</div>
        <button className="block hover:bg-white/10 px-4 py-2 transition-colors duration-300 text-center cursor-pointer" onClick={handleLogoutClick}>Logout</button>
    </> : '';

    const userDropDown = <nav className="flex items-stretch ml-auto mr-2">
        <div className="relative flex items-center">
            <button
                className="shrink-0 inline-block px-2 cursor-pointer"
                onClick={() => (setIsUserMenuOpen(!isUserMenuOpen))}
                onMouseEnter={() => (setIsUserMenuOpen(true))}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="M232-253.08q59.92-38.46 118.92-58.96T480-332.54q70.08 0 129.38 20.5 59.31 20.5 119.23 58.96 43.62-50.53 64.81-106.69 21.19-56.15 21.19-120.23 0-141.54-96.53-238.08-96.54-96.53-238.08-96.53-141.54 0-238.08 96.53-96.53 96.54-96.53 238.08 0 64.08 21.5 120.23 21.5 56.16 65.11 106.69Zm247.81-204.23q-53.96 0-90.77-36.99-36.81-37-36.81-90.96 0-53.97 36.99-90.78 37-36.81 90.97-36.81 53.96 0 90.77 37 36.81 36.99 36.81 90.96 0 53.97-36.99 90.77-37 36.81-90.97 36.81ZM479.6-100q-78.92 0-148.4-29.77-69.47-29.77-120.87-81.58-51.41-51.8-80.87-120.8Q100-401.14 100-480.5q0-78.97 29.77-148.16t81.58-120.49q51.8-51.31 120.8-81.08Q401.14-860 480.5-860q78.97 0 148.16 29.77t120.49 81.08q51.31 51.3 81.08 120.65Q860-559.15 860-480.27q0 79.28-29.77 148.2-29.77 68.92-81.08 120.72-51.3 51.81-120.78 81.58Q558.9-100 479.6-100Z"/></svg>
            </button>
            <div
                className={"absolute z-10 top-full right-0 p-3 rounded-b-md min-w-[50dvw] md:min-w-[300px] flex-col gap-1 bg-header-bg text-header-text " + (isUserMenuOpen ? "flex" : "hidden")}
                onMouseLeave={() => (setIsUserMenuOpen(false))}
            >
                {guestControls}
                {userControls}
            </div>

        </div>
    </nav>;

    useEffect(() => {
        function preventDefaultTouch(e) {
            e.preventDefault();
        }

        if(isMobileMenuOpen)
        {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
            document.addEventListener('touchmove', preventDefaultTouch, { passive: false });
        }
        else
        {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            document.removeEventListener('touchmove', preventDefaultTouch);
        }

        return () => {
            document.removeEventListener('touchmove', preventDefaultTouch);
        }
    }, [isMobileMenuOpen]);

    return <>
        <header className="fixed top-0 left-0 z-10 bg-header-bg text-header-text w-full h-[62px] md:h-[88px] flex">
            {/* Mobile Nav */}
            <div className="md:hidden w-full flex">
                <button className="ml-5" onClick={() => setIsMobileMenuOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="M120-240v-66.67h720V-240H120Zm0-206.67v-66.66h720v66.66H120Zm0-206.66V-720h720v66.67H120Z"/></svg>
                </button>
                <SiteLogo/>
                {userDropDown}
            </div>
            {/* /Mobile Nav */}
            <div className="hidden md:flex flex-1 items-stretch justify-between">
                <div className="flex items-stretch">
                    <SiteLogo/>
                    <SiteNav/>
                </div>

                <div className="flex space-x-10 items-stretch">
                    <div className="flex items-center space-x-4">
                        {auth.user && auth.user.can.createJobs ? <SiteNavLink callToAction={true} href="/jobs/create">Create Job</SiteNavLink> : null}
                    </div>

                    {userDropDown}
                </div>
            </div>
        </header>
        <div className="h-[62px] md:h-[88px]"></div>

        {isMobileMenuOpen ? <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex flex-col justify-center bg-primary text-white">
            <div className="flex flex-col gap-2 items-center p-5">
                <SiteLogo onClick={(e) => { setIsMobileMenuOpen(false) }}/>
                <SiteNav direction="vertical" onNavLinkClick={(e) => { setIsMobileMenuOpen(false) }}/>
                {auth.user && auth.user.can.createJobs ? <SiteNavLink variant="alternate" callToAction={true} onClick={(e) => { setIsMobileMenuOpen(false) }} href="/jobs/create">Create Job</SiteNavLink> : null}
            </div>
            <button className="p-10 absolute bottom-0 left-[50%] -translate-x-1/2" onClick={() => setIsMobileMenuOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/></svg>
            </button>
        </div> : null}
    </>
}
