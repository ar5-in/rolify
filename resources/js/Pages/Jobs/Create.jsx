import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import {useState} from "react";
import FormGroup from "@/Shared/Form/FormGroup.jsx";
import FormAction from "@/Shared/Form/FormAction.jsx";

export default function Create({employers}) {
    const [isAddingEmployer, setIsAddingEmployer] = useState(false);
    const [employerOptions, setEmployerOptions] = useState(employers.map(employer => ({value: employer.id, label: employer.name})));
    const [selectedEmployerOption, setSelectedEmployerOption] = useState(null);
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

    const handleCreateEmployerResponse = (response) => {
        if(response.data.employer)
        {
            const newEmployer = {value: response.data.employer.id, label: response.data.employer.name};
            setEmployerOptions([...employerOptions, newEmployer]);
            setIsAddingEmployer(false);
            setSelectedEmployerOption(newEmployer.value);
            addNotification({message: `${newEmployer.label} added to the list`, type: "success"});
        }
    }

    const showNewEmployerForm = () => {
        setIsAddingEmployer(true);
    }

    return (
        <Page heading="Create New Job">

            {isAddingEmployer && <>
                <RequestForm wide action="/employers" method="post" onResolve={handleCreateEmployerResponse.bind(this)}>
                    <FormGroup label="Create New Employer">
                        <FormControl label="Employer Name" name="name" type="text"
                                     placeholder="ACME Corp" disabled={false} />
                        <FormControl label="Logo URL" name="logo_url" type="text"
                                     placeholder="https://urltologo" disabled={false} />
                    </FormGroup>
                    <FormActionGroup>
                        <FormAction label="Create Employer" />
                        <FormAction type="button" label="Cancel" variant="alternate" onClick={() => setIsAddingEmployer(false)} />
                    </FormActionGroup>
                </RequestForm>
            </>}

            <RequestForm wide action="/jobs" method="post" disabled={isAddingEmployer} onResolve={handleCreateJobResponse.bind(this)}>

                <FormGroup label="Employer details">
                    <FormControl label="Select Employer" name="employer_id" type="select"
                                 options={employerOptions} selectOption={selectedEmployerOption}
                                 withAction actionLabel={isAddingEmployer ? 'Cancel' : 'Add New'} onAction={showNewEmployerForm} />
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
        </Page>
    )
}
