import {Link} from "@inertiajs/react";

export default function Button({ label = 'Button', type, variant, href, onClick = () => {} }) {

    const classes = variant === 'alternate' || type === 'link'
        ? 'inline-block text-primary hover:bg-black/10 px-6 py-2 rounded-full text-lg font-bold cursor-pointer transition-colors duration-300'
        : 'inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer';

    if(type === 'link')
    {
        return (
            <Link className={classes} href={href} onClick={onClick.bind(this)}>{label}</Link>
        )
    }

    return (
        <button className={classes} type={type} onClick={onClick.bind(this)}>{label}</button>
    )
}
