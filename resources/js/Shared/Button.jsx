import {Link} from "@inertiajs/react";

export default function Button({ label = 'button', type, href, onClick = () => {} }) {
    if(type === 'link')
    {
        return (
            <Link className="inline-block text-primary hover:bg-black/10 px-6 py-2 rounded-full text-lg font-bold transition-colors duration-300" href={href} onClick={onClick.bind(this)}>{label}</Link>
        )
    }

    return (
        <button className="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer" type={type} onClick={onClick.bind(this)}>{label}</button>
    )
}
