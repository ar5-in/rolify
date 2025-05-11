import Page from "@/Shared/Page.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActions from "@/Shared/Form/FormActions.jsx";
import Button from "@/Shared/Button.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import {router} from "@inertiajs/react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import {useState} from "react";

export default function Create({employers}) {
    const [errors, setErrors] = useState({});
    const addNotification = useAddNotification();

    const locationOptions = [
        {value: 'New York', label: 'New York'},
        {value: 'Los Angeles', label: 'Los Angeles'},
        {value: 'Florida', label: 'Florida'},
    ]

    const handleResolve = (response) => {
        const job = response.data && response.data.job ? response.data.job : null;
        if(job)
        {
            addNotification({message: `'${job.title}' created successfully`, type: "success"});
            router.get(`/jobs/${job.id}`);
            return;
        }

        addNotification({message: "There was an error while creating the job.", type: "error"});
    }
    const handleError = (response) => {
        if(response.errors)
        {
            setErrors(response.errors);
        }
    }

    return (
        <Page heading="Create New Job">
            <RequestForm wide action="/jobs" method="post" onResolve={handleResolve.bind(this)} onError={handleError.bind(this)}>

                <FormControl label="Select Employer" name="employer_id" type="select" options={employers.map(employer => ({value: employer.id, label: employer.name}))}
                             error={errors['employer_id']} />

                <FormControl label="Job Title / Designation" name="title" type="text"
                             placeholder="Junior Frontend Developer" error={errors['title']} />

                <FormControl label="Compensation" name="compensation" type="text"
                             placeholder="$20,000 per year" error={errors['compensation']} />

                <FormControl label="Location" name="location" type="select" options={locationOptions}
                             error={errors['location']} />

                <FormControl label="is Featured" name="is_featured" type="checkbox" error={errors['is_featured']} initialValue="1" />

                <FormControl label="Tags" name="tags" type="textarea"
                             placeholder="Laravel, React, Inertia, web development, frontend" error={errors['tags']} />

                <FormActions>
                    <Button label="Create Job" />
                    <Button type="button" variant="alternate" label="Cancel" onClick={() => {history.back()}} />
                </FormActions>
            </RequestForm>
        </Page>
    )
}
