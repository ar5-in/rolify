import {Link} from "@inertiajs/react";

export default function Button({ label = 'button', type, href }) {
    if(type === 'link')
    {
        return (
            <Link className="inline-block text-primary hover:bg-black/10 px-6 py-2 rounded-full text-lg font-bold transition-colors duration-300" href={href}>{label}</Link>
        )
    }

    return (
        <button className="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer" type={type}>{label}</button>
    )
}
