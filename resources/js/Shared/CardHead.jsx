import {useContext} from "react";
import {CardVariantContext} from "@/Shared/CardVariantContext.jsx";

export default function ({className, children}) {
    const variant = useContext(CardVariantContext);

    return variant !== 'wide'
        ? <div className="flex-1 flex flex-col p-5 rounded-xl space-y-5 bg-[#eceff5]">{children}</div>
        : <div className="flex flex-3 items-start p-5 rounded-xl space-x-5 bg-[#eceff5]">{children}</div>
}
