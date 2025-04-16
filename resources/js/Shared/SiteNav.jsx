import SiteNavLink from "./SiteNavLink.jsx";
import {usePage} from "@inertiajs/react";

export default function SiteNav() {
    const {component} = usePage();

    return <nav className="flex">
        <SiteNavLink href="/" active={component === 'Jobs/Index'}>Find Jobs</SiteNavLink>
        <SiteNavLink href="/jobs/saved" active={component === 'Jobs/Saved'}>Saved Jobs</SiteNavLink>
        <SiteNavLink href="/faq" active={component === 'FAQ'}>FAQ</SiteNavLink>
    </nav>
}
