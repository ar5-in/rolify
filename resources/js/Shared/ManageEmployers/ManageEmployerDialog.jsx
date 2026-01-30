import ManageEmployers from "@/Shared/ManageEmployers/ManageEmployers.jsx";
import Dialog from "@/Shared/Dialog.jsx";
import {useState} from "react";

export default function ManageEmployersDialog({onClose}) {
    const [employers, setEmployers] = useState([]);
    const handleDialogClose = () => {
        onClose(employers);
    }

    const updateEmployers = (employers) => {
        setEmployers(employers);
    }
    return <Dialog title="Manage Employers" onClose={handleDialogClose}>
        <ManageEmployers onUpdate={updateEmployers} />
    </Dialog>
}
