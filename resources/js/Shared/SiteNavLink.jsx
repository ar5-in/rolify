import {Link} from "@inertiajs/react";

export default function SiteNavLink({variant = 'standard', href, active = false, type = 'a', callToAction = false, onClick, children}) {
    const standardClasses = callToAction
        ? "block px-6 py-2 bg-header-text text-header-bg rounded-full"
        : "cursor-pointer px-3 flex items-center text-center " + (
            active
                ? "border-b-2 border-b-header-text"
                : "border-b-2 border-b-transparent hover:border-b-header-text/80 transition-colors duration-300"
            );

    const alternateClasses = callToAction
        ? "block w-full px-6 py-4 bg-header-text text-header-bg rounded-full text-xl text-center"
        : "block w-full px-6 py-4 rounded-full text-2xl text-center cursor-pointer " + (
        active
            ? "border-2 border-header-text"
            : "border-2 border-header-text/10 hover:border-header-text/80 transition-colors duration-300"
    );

    const className = variant === 'alternate' ? alternateClasses : standardClasses;

    return <Link href={href} as={type} className={className} onClick={(e) => onClick && onClick(e)}>
        {children}
    </Link>;
}
