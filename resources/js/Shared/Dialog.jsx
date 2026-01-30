import {createPortal} from "react-dom";
import Button from "./Button.jsx";

export default function ({title, children, onClose}) {
    return createPortal(
        <div className={
            `fixed top-0 left-0 w-full h-full p-4 bg-black/10 flex items-center justify-center isolate`
        }>
            <div className={`bg-body-bg rounded-2xl grow sm:max-w-md drop-shadow-2xl`}>
                <div className={`border-b border-b-primary/10 py-2 px-4 flex justify-between items-center`}>
                    <div className={`font-bold text-primary text-lg`}>{title}</div>
                    <button
                        className={`size-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-black/10 transition-colors duration-300`}
                        type="button" onClick={() => onClose()}>

                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                             fill="#000">
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
        , document.body);
}
