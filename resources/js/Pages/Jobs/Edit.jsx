import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActionGroup from "@/Shared/Form/FormActionGroup.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import ConfirmButton from "@/Shared/ConfirmButton.jsx";
import FormAction from "@/Shared/Form/FormAction.jsx";

export default function Edit({job, employers}) {
    const addNotification = useAddNotification();

    const locationOptions = [
        {value: 'New York', label: 'New York'},
        {value: 'Los Angeles', label: 'Los Angeles'},
        {value: 'Florida', label: 'Florida'},
    ];

    const handleResolve = () => {
        if (job) {
            addNotification({message: `'${job.title}' job updated`, type: "success"});
            router.get(`/jobs/${job.id}`);
            return;
        }

        addNotification({message: "There was an error while updating the job.", type: "error"});
    }

    const handleDeleteJobClick = () => {
        router.delete(`/jobs/${job.id}`);
        addNotification({message: `'${job.title}' job deleted`});
    }

    return (
        <Page heading={`Edit Job #${job.id}`}>
            <RequestForm wide action={`/jobs/${job.id}`} method="patch" onResolve={handleResolve.bind(this)}>

                <FormControl label="Select Employer" name="employer_id" type="select"
                             options={employers.map(employer => ({value: employer.id, label: employer.name}))}
                             initialValue={job.employer_id}/>

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

                <FormActionGroup>
                    <FormAction label="Update Job"/>
                    <FormAction type="button" variant="alternate" label="Cancel" onClick={() => {
                        history.back()
                    }}/>

                    <ConfirmButton variant="danger" label="Delete Job" message="Permanently delete this job?"
                                   onConfirm={handleDeleteJobClick}/>
                </FormActionGroup>
            </RequestForm>
        </Page>
    )
}
