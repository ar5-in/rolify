import {Link} from "@inertiajs/react";

export default function SiteLogo({onClick}) {
    return <Link className="flex items-center px-5 md:px-7" href="/" onClick={(e) => onClick && onClick(e)}>
        <img className="shrink-0 h-auto w-[68px]" src={new URL(`/resources/images/logo.svg`, import.meta.url).href} alt=""/>
    </Link>
}
