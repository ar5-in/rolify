import Button from "@/Shared/Button.jsx";
import {useState} from "react";

export default function ConfirmButton({label, message = 'Are you sure?', variant, onConfirm, onCancel}) {
    const [isDeciding, setIsDeciding] = useState(false);
    const [hasConfirmed, setHasConfirmed] = useState(false);

    const handleConfirmButtonClick = () => {
        setIsDeciding(false);
        setHasConfirmed(true);
        if(onConfirm)
        {
            onConfirm();
        }
    }
    const handleCancelButtonClick = () => {
        setIsDeciding(false);
        if(onCancel)
        {
            onCancel();
        }
    }

    if(hasConfirmed)
    {
        return (
            <>Got it!</>
        )
    }

    if (!isDeciding) {
        return <Button type="button" label={label} variant={variant} onClick={() => setIsDeciding(true)}/>
    }

    return (
        <div className={`ml-auto`}>
            {message}
            <Button type="button" label="Yes" variant="alternate" onClick={handleConfirmButtonClick}/>
            <Button type="button" label="No" onClick={handleCancelButtonClick}/>
        </div>
    );
}
