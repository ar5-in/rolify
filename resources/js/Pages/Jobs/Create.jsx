import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import {useState} from "react";
import FormGroup from "@/Shared/Form/FormGroup.jsx";
import FormAction from "@/Shared/Form/FormAction.jsx";
import Dialog from "../../Shared/Dialog.jsx";
import ManageEmployers from "../../Shared/ManageEmployers/ManageEmployers.jsx";

export default function Create({employers}) {
    const [isManageEmployersDialogOpen, setIsManageEmployersDialogOpen] = useState(false);
    const [employerOptions, setEmployerOptions] = useState(employers.map(employer => ({value: employer.id, label: employer.name})));
    const addNotification = useAddNotification();

    const locationOptions = [
        {value: 'New York', label: 'New York'},
        {value: 'Los Angeles', label: 'Los Angeles'},
        {value: 'Florida', label: 'Florida'},
    ]

    const handleCreateJobResponse = (response) => {
        const job = response.data && response.data.job ? response.data.job : null;
        if (job) {
            addNotification({message: `'${job.title}' created successfully`, type: "success"});
            router.get(`/jobs/${job.id}`);
            return;
        }

        addNotification({message: "There was an error while creating the job.", type: "error"});
    }

    const openManageEmployersDialog = () => {
        setIsManageEmployersDialogOpen(true);
    }

    const handleManageEmployersDialogClose = (employers) => {
        setEmployerOptions(employers.map(employer => ({value: employer.id, label: employer.name})));
        setIsManageEmployersDialogOpen(false);
    }

    return (
        <Page heading="Create New Job">
            <RequestForm wide action="/jobs" method="post" onResolve={handleCreateJobResponse.bind(this)}>

                <FormGroup label="Employer details">
                    <FormControl label="Select Employer" name="employer_id" type="select"
                                 options={employerOptions}
                                 withAction actionLabel={'Manage'} onAction={openManageEmployersDialog} />
                </FormGroup>

                <FormGroup label="Job Description">
                    <FormControl label="Job Title / Designation" name="title" type="text"
                                 placeholder="Junior Frontend Developer" />

                    <FormControl label="Compensation" name="compensation" type="text"
                                 placeholder="$20,000 per year" />

                    <FormControl label="Location" name="location" type="select" options={locationOptions}
                                 />

                    <FormControl label="is Featured" name="is_featured" type="checkbox"
                                 initialValue="1"/>

                    <FormControl label="Tags" name="tags" type="textarea"
                                 placeholder="Laravel, React, Inertia, web development, frontend"
                                 />
                </FormGroup>

                <FormActionGroup>
                    <FormAction label="Create" />
                    <FormAction type="button" variant="alternate" label="Cancel" onClick={() => {
                        history.back()
                    }}/>
                </FormActionGroup>
            </RequestForm>

            {isManageEmployersDialogOpen ?
                <ManageEmployersDialog onClose={handleManageEmployersDialogClose}/> : null}
        </Page>
    )
}

function ManageEmployersDialog({onClose}) {
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
