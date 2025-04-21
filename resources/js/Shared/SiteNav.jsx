import SiteNavLink from "./SiteNavLink.jsx";
import {usePage} from "@inertiajs/react";

export default function SiteNav() {
    const {component} = usePage();
    const {auth} = usePage().props;

    return <nav className="flex">
        <SiteNavLink href="/" active={component === 'Jobs/Index'}>Find Jobs</SiteNavLink>
        {auth.user
            ? <>
                <SiteNavLink href="/jobs/saved" active={component === 'Jobs/Saved/Index'}>Saved Jobs</SiteNavLink>
                {auth.user.can.createJobs ? <SiteNavLink href="/jobs/created" active={component === 'Jobs/Created/Index'}>My Jobs</SiteNavLink> : null}
                {auth.user.can.createJobApplication ? <SiteNavLink href="/applications" active={component === 'JobApplications/Index'}>My Applications</SiteNavLink> : null}
            </>
            : null}
        <SiteNavLink href="/faq" active={component === 'FAQ'}>FAQ</SiteNavLink>
    </nav>
}
