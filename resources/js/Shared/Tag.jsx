import {Link} from "@inertiajs/react";

export default function Tag ({ tag }) {
    const className = "inline-flex px-4 py-1 border border-black/20 rounded-full text-xs font-bold text-primary hover:bg-black/5 hover:border-black/25";
    return <Link className={className} href={`/tags/${tag.id}`}>{tag.name}</Link>
}
