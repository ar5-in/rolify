import Button from "@/Shared/Button.jsx";
import {useContext} from "react";
import {FormDisabledContext} from "@/Shared/Form/FormContext.jsx";

export default function FormAction({label, type, href, variant, onClick}) {
    const formDisabled = useContext(FormDisabledContext);
    return (
        <Button label={label} type={type} variant={variant} href={href} onClick={onClick} disabled={formDisabled}/>
    )
}
