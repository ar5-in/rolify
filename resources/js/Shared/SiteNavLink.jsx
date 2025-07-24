import {Link} from "@inertiajs/react";

export default function SiteNavLink({href, active = false, type = 'a', callToAction = false, onClick, children}) {
    const className = callToAction
        ? "block px-6 py-2 bg-header-text text-header-bg rounded-full"
        : "cursor-pointer px-3 flex items-center text-center " + (
            active
                ? "border-b-2 border-b-header-text"
                : "border-b-2 border-b-transparent hover:border-b-header-text/80 transition-colors duration-300"
            );

    return <Link href={href} as={type} className={className} onClick={(e) => onClick && onClick(e)}>
        {children}
    </Link>;
}
