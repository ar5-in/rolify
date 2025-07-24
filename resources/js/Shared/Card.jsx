import Panel from "@/Shared/Panel.jsx";
import {CardVariantContext} from "@/Shared/CardVariantContext.jsx";

export default function Card({className, variant = 'standard', scrollable, children}) {
    let classes = [];
    classes.push('flex flex-col');
    if(variant === 'wide')
    {
        classes.push('md:flex-row shrink-0');
    }

    if(scrollable !== undefined)
    {
        classes.push('w-[90%] md:w-full');
    }
    else
    {
        classes.push('w-full');
    }

    classes.push(className);

    return <CardVariantContext value={variant}>
        <Panel className={classes.join(' ')}>{children}</Panel>
    </CardVariantContext>
}
