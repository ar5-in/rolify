import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import ConfirmButton from "@/Shared/ConfirmButton.jsx";
import FormAction from "@/Shared/Form/FormAction.jsx";
import {useState} from "react";
import FormGroup from "@/Shared/Form/FormGroup.jsx";

export default function Edit({job, employers}) {
    const [isAddingEmployer, setIsAddingEmployer] = useState(false);
    const [employerOptions, setEmployerOptions] = useState(employers.map(employer => ({value: employer.id, label: employer.name})));
    const [selectedEmployerOption, setSelectedEmployerOption] = useState(job.employer_id);
    const addNotification = useAddNotification();

    const locationOptions = [
        {value: 'New York', label: 'New York'},
        {value: 'Los Angeles', label: 'Los Angeles'},
        {value: 'Florida', label: 'Florida'},
    ];

    const handleUpdateJobResponse = () => {
        addNotification({message: `'${job.title}' updated successfully`, type: "success"});
        router.get(`/jobs/${job.id}`);
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
        setIsAddingEmployer(!isAddingEmployer);
    }

    const handleDeleteJobClick = () => {
        router.delete(`/jobs/${job.id}`);
        addNotification({message: `'${job.title}' job deleted`});
    }

    return (
        <Page heading={`Edit Job #${job.id}`}>

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

            <RequestForm wide action={`/jobs/${job.id}`} method="patch" disabled={isAddingEmployer} onResolve={handleUpdateJobResponse.bind(this)}>

                <FormGroup label="Employer details">
                    <FormControl label="Select Employer" name="employer_id" type="select"
                                 options={employerOptions} selectOption={selectedEmployerOption} initialValue={job.employer_id}
                                 withAction actionLabel={isAddingEmployer ? 'Cancel' : 'Add New'} onAction={showNewEmployerForm} />
                </FormGroup>

                <FormGroup label="Job Description">
                    <FormControl label="Job Title / Designation" name="title" type="text"
                                 placeholder="Junior Frontend Developer" initialValue={job.title}/>

                    <FormControl label="Compensation" name="compensation" type="text"
                                 placeholder="$20,000 per year"
                                 initialValue={job.compensation}/>

                    <FormControl label="Location" name="location" type="select" options={locationOptions}
                                 initialValue={job.location}/>

                    <FormControl label="is Featured" name="is_featured" type="checkbox"
                                 initialValue="1" checked={job.is_featured === 1}/>

                    <FormControl label="Tags" name="tags" type="textarea"
                                 placeholder="Laravel, React, Inertia, web development, frontend"
                                 initialValue={job.tags.map(tag => tag.name).join(', ')}/>
                </FormGroup>
                <FormActionGroup>
                    <FormAction label="Update Job"/>
                    <FormAction type="button" variant="alternate" label="Cancel" onClick={() => {
                        history.back()
                    }}/>

                    <ConfirmButton variant="danger" label="Delete Job" message="Permanently delete this job?"
                                   onConfirm={handleDeleteJobClick} disabled={isAddingEmployer} />
                </FormActionGroup>
            </RequestForm>
        </Page>
    )
}
