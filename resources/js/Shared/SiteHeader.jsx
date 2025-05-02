import {Link, router, usePage} from "@inertiajs/react";
import SiteNav from "@/Shared/SiteNav.jsx";
import SiteLogo from "@/Shared/SiteLogo.jsx";
import SiteNavLink from "@/Shared/SiteNavLink.jsx";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";

export default function SiteHeader () {
    const {auth} = usePage().props;
    const addNotification = useAddNotification();

    const handleLogoutClick = () => {
        router.delete('/logout');
        addNotification({
            message: "You have been logged out",
            type:"success"
        });
    }

    const guestControls = !auth.user ? <>
        <Link className="block hover:bg-white/10 px-4 py-2 transition-colors duration-300"
              href="/login">Login</Link>
        <Link className="block hover:bg-white/10 px-4 py-2 transition-colors duration-300"
              href="/register">Register</Link>
    </> : '';

    const userControls = auth.user ? <>
        <div>Hi, {auth.user.name}</div>
        <button className="block hover:bg-white/10 px-4 py-2 transition-colors duration-300" onClick={handleLogoutClick}>Logout</button>
    </> : '';

    return <>
        <header className="bg-header-bg text-header-text flex items-stretch justify-between h-[88px]">
            <div className="flex items-stretch">
                <SiteLogo/>
                <SiteNav/>
            </div>

            <div className="flex space-x-10 items-stretch">
                <div className="flex items-center space-x-4">
                    {auth.user && auth.user.can.createJobs ? <SiteNavLink callToAction={true} href="/jobs/create">Create Job</SiteNavLink> : null}
                    <div className="border border-header-text/20 px-6 py-3">Location</div>
                </div>

                <nav className="flex items-stretch space-x-3 mr-5">
                    <div className="relative flex items-center group/dropdown">
                        <a className="inline-block px-2 rounded-full" href="">
                            <img className="inline-block rounded-full" src="https://placehold.co/38x38"
                                 alt="User Login"/>
                        </a>
                        <div
                            className="absolute top-full right-0 p-1 flex-col gap-1 bg-header-bg text-header-text hidden group-hover/dropdown:flex">
                            {guestControls}
                            {userControls}
                        </div>

                    </div>
                </nav>
            </div>
        </header>
    </>
}
