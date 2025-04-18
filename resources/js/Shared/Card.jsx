import Panel from "@/Shared/Panel.jsx";
import {CardVariantContext} from "@/Shared/CardVariantContext.jsx";

export default function Card({className, variant = 'standard', children}) {
    let classes = [];
    classes.push((variant !== 'wide' ? 'flex flex-col' : 'flex'));
    classes.push(className);

    return <CardVariantContext value={variant}>
        <Panel className={classes.join(' ')}>{children}</Panel>
    </CardVariantContext>
}
