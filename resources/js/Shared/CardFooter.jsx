import {useContext} from "react";
import {CardVariantContext} from "@/Shared/CardVariantContext.jsx";

export default function ({children}) {
    const variant = useContext(CardVariantContext);

    return variant !== 'wide'
        ? <div className="flex p-5 justify-between items-end space-x-1">{children}</div>
        : <div className="flex flex-1 flex-col p-5 justify-start text-center space-y-5">{children}</div>
}
