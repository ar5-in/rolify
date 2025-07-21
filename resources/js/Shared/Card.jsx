import Panel from "@/Shared/Panel.jsx";
import {CardVariantContext} from "@/Shared/CardVariantContext.jsx";

export default function Card({className, variant = 'standard', children}) {
    let classes = [];
    classes.push('flex flex-col');
    if(variant === 'wide')
    {
        classes.push('md:flex-row shrink-0 w-[80%] md:w-full');
    }

    classes.push(className);

    return <CardVariantContext value={variant}>
        <Panel className={classes.join(' ')}>{children}</Panel>
    </CardVariantContext>
}
