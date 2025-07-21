import {useContext} from "react";
import {CardVariantContext} from "@/Shared/CardVariantContext.jsx";

export default function ({className, children}) {
    const variant = useContext(CardVariantContext);
    const classes = ['flex-1 flex flex-col p-5 rounded-xl space-y-5 bg-[#eceff5]', className];

    if(variant === 'wide')
    {
        classes.push('md:flex-3 md:flex-row items-start');
    }

    return <div className={classes.join(' ')}>{children}</div>
}
