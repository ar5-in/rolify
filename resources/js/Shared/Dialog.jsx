import {createPortal} from "react-dom";
import Button from "./Button.jsx";

export default function ({title, children, onClose}) {
    return createPortal(
        <div className={
            `fixed top-0 left-0 w-full h-full p-4 bg-black/10 flex items-center justify-center isolate`
        }>
            <div className={`bg-body-bg rounded-2xl grow sm:max-w-md`}>
                <div className={`border-b border-b-primary/10 py-2 px-4 flex justify-between items-center`}>
                    <div className={`font-bold text-primary text-lg`}>{title}</div>
                    <Button label={'close'} onClick={() => onClose()} />
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
        , document.body);
}
