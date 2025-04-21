import SiteNavLink from "./SiteNavLink.jsx";
import {usePage} from "@inertiajs/react";

export default function SiteNav() {
    const {component} = usePage();

    return <nav className="flex">
        <SiteNavLink href="/" active={component === 'Jobs/Index'}>Find Jobs</SiteNavLink>
        <SiteNavLink href="/jobs/saved" active={component === 'Jobs/Saved/Index'}>Saved Jobs</SiteNavLink>
        <SiteNavLink href="/jobs/created" active={component === 'Jobs/Created/Index'}>My Jobs</SiteNavLink>
        <SiteNavLink href="/applications" active={component === 'JobApplications/Index'}>My Applications</SiteNavLink>
        <SiteNavLink href="/faq" active={component === 'FAQ'}>FAQ</SiteNavLink>
    </nav>
}
