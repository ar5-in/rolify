import SiteNavLink from "./SiteNavLink.jsx";
import {usePage} from "@inertiajs/react";
import {useSavedJobs} from "@/Shared/SavedJobs/SavedJobsContext.jsx";

export default function SiteNav({direction = 'horizontal', onNavLinkClick}) {
    const {component} = usePage();
    const {auth} = usePage().props;
    const {savedJobs} = useSavedJobs();

    const classes = direction === 'horizontal'
        ? "flex"
        : "flex flex-col items-center";

    const handleNavLinkClick = (e) => {
        onNavLinkClick && onNavLinkClick(e);
    }

    return <nav className={classes}>
        <SiteNavLink href="/" active={component === 'Jobs/Index'} onClick={handleNavLinkClick}>Find Jobs</SiteNavLink>
        {auth.user
            ? <>
                <SiteNavLink href="/jobs/saved" active={component === 'Jobs/Saved/Index'} onClick={handleNavLinkClick}>Saved Jobs{savedJobs.length > 0 && ` (${savedJobs.length})`}</SiteNavLink>
                {auth.user.can.createJobs ? <SiteNavLink href="/jobs/created" active={component === 'Jobs/Created/Index'} onClick={handleNavLinkClick}>My Jobs</SiteNavLink> : null}
                {auth.user.can.createJobApplication ? <SiteNavLink href="/applications" active={component === 'JobApplications/Index'} onClick={handleNavLinkClick}>My Applications</SiteNavLink> : null}
            </>
            : null}
        <SiteNavLink href="/faq" active={component === 'FAQ'} onClick={handleNavLinkClick}>FAQ</SiteNavLink>
    </nav>
}
