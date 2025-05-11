import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActions from "@/Shared/Form/FormActions.jsx";
import Button from "@/Shared/Button.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import {useState} from "react";
import ConfirmButton from "@/Shared/ConfirmButton.jsx";

export default function Edit({job, employers}) {
    const [errors, setErrors] = useState({});
    const addNotification = useAddNotification();

    const locationOptions = [
        {value: 'New York', label: 'New York'},
        {value: 'Los Angeles', label: 'Los Angeles'},
        {value: 'Florida', label: 'Florida'},
    ];

    const handleResolve = (response) => {
        if (job) {
            addNotification({message: `'${job.title}' job updated`, type: "success"});
            router.get(`/jobs/${job.id}`);
            return;
        }

        addNotification({message: "There was an error while updating the job.", type: "error"});
    }
    const handleError = (response) => {
        if (response.errors) {
            setErrors(response.errors);
        }
    }

    const handleDeleteJobClick = () => {
        router.delete(`/jobs/${job.id}`);
        addNotification({message: `'${job.title}' job deleted`});
    }

    return (
        <Page heading={`Edit Job #${job.id}`}>
            <RequestForm wide action={`/jobs/${job.id}`} method="patch" onResolve={handleResolve.bind(this)}
                         onError={handleError.bind(this)}>

                <FormControl label="Select Employer" name="employer_id" type="select"
                             options={employers.map(employer => ({value: employer.id, label: employer.name}))}
                             error={errors['employer_id']} initialValue={job.employer_id}/>

                <FormControl label="Job Title / Designation" name="title" type="text"
                             placeholder="Junior Frontend Developer" error={errors['title']} initialValue={job.title}/>

                <FormControl label="Compensation" name="compensation" type="text"
                             placeholder="$20,000 per year" error={errors['compensation']}
                             initialValue={job.compensation}/>

                <FormControl label="Location" name="location" type="select" options={locationOptions}
                             error={errors['location']} initialValue={job.location}/>

                <FormControl label="is Featured" name="is_featured" type="checkbox" error={errors['is_featured']}
                             initialValue="1" checked={job.is_featured === 1}/>

                <FormControl label="Tags" name="tags" type="textarea"
                             placeholder="Laravel, React, Inertia, web development, frontend" error={errors['tags']}
                             initialValue={job.tags.map(tag => tag.name).join(', ')}/>

                <FormActions>
                    <Button label="Update Job"/>
                    <Button type="button" variant="alternate" label="Cancel" onClick={() => {
                        history.back()
                    }}/>

                    <ConfirmButton variant="danger" label="Delete Job" message="Permanently delete this job?"
                                   onConfirm={handleDeleteJobClick}/>
                </FormActions>
            </RequestForm>
        </Page>
    )
}
