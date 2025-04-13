import {Link} from "@inertiajs/react";

export default function SiteHeader () {
    return <>
        <header className="bg-header-bg text-header-text flex items-stretch justify-between h-[88px]">
            <div className="flex items-stretch">
                <nav className="flex">
                    <Link href="/faq" className="cursor-pointer px-7 flex items-center border-b-2 border-b-transparent hover:border-b-header-text/80 transition-colors duration-300">FAQ</Link>
                    <Link href="/test" className="cursor-pointer px-7 flex items-center border-b-2 border-b-transparent hover:border-b-header-text/80 transition-colors duration-300">Test Link</Link>
                </nav>
            </div>
        </header>
    </>
}
