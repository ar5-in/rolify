import {Link} from "@inertiajs/react";

export default function Button({ label = 'Button', type, variant, href, onClick = () => {} }) {

    const getClasses = (variant) => {
        const classes = {
            'default': 'inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer',
            'alternate': 'inline-block text-primary hover:bg-black/10 px-6 py-2 rounded-full text-lg font-bold cursor-pointer transition-colors duration-300',
            'danger': 'inline-block ml-auto text-red-600 hover:bg-black/10 px-6 py-2 rounded-full text-lg font-bold cursor-pointer transition-colors duration-300'
        }

        return classes[variant] ?? classes['default'];
    }

    if(type === 'link')
    {
        return (
            <Link className={getClasses(variant)} href={href} onClick={onClick.bind(this)}>{label}</Link>
        )
    }

    return (
        <button className={getClasses(variant)} type={type} onClick={onClick.bind(this)}>{label}</button>
    )
}
