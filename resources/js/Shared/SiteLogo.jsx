import {Link} from "@inertiajs/react";

export default function SiteLogo() {
    return <Link className="flex items-center px-7" href="/">
        <img src={new URL(`/resources/images/logo.svg`, import.meta.url).href} alt=""/>
    </Link>
}
