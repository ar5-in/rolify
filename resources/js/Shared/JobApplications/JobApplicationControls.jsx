import {router, usePage} from "@inertiajs/react";
import Button from "@/Shared/Button.jsx";
import RequestForm from "@/Shared/RequestForm.jsx";
import FormControl from "@/Shared/Form/FormControl.jsx";
import FormActions from "@/Shared/Form/FormActions.jsx";
import {useState} from "react";
import {useAddNotification} from "@/Shared/Notifications/NotificationsContext.jsx";
import ConfirmButton from "@/Shared/ConfirmButton.jsx";

export default function JobApplicationControls({job}) {
    const {auth} = usePage().props;
    const application = job.authUser.application;

    const hasApplied = application !== null;
    const canCreateJobApplication = auth.user && auth.user.can.createJobApplication;
    const applicationStatusClasses = {
        approved: 'bg-approved text-white', rejected: 'bg-rejected text-white', pending: 'bg-body-text text-white'
    }

    return (
        <>
            {hasApplied &&
                <div className="p-5 border border-black/10 rounded-2xl">
                    <h3 className="flex gap-2 mb-2 text-xl text-primary font-medium">
                        Your Application
                        <span
                            className={`text-sm px-4 py-1 rounded-full ${applicationStatusClasses[application.status]}`}>
                            {application.status}
                        </span>
                    </h3>

                    <p>You applied to this job on {application.created_at}</p>

                    <CoverLetter application={application} onUpdate={() => router.get(`/jobs/${job.id}`)}/>

                    {application.authUser.can.delete ? <WithdrawApplication application={application}/> : null}
                </div>
            }

            {!hasApplied && canCreateJobApplication &&
                <ApplicationForm jobId={job.id}/>}

            <Applications job={job}/>

        </>
    )
}

function Applications({job}) {

    if (job.applications)
        return (
            <>
                <div className="mt-5 pt-2 border-t border-t-black/10"></div>
                <h3 className="my-3 text-lg font-bold text-primary">Applications</h3>
                <div className="space-y-3">
                    {job.applications.length === 0
                        ? <div className="p-10 text-2xl text-center font-medium text-black/20">No application received
                            yet</div>
                        : job.applications.map(application => (
                            <div key={application.id} className="p-5 border border-black/10 rounded-2xl">
                                <h4 className="mb-2 text-lg font-medium space-x-2">
                                    <span>Applicant:
                                    <span className="text-primary">{application.user.name} ({application.user.email})</span>
                                    </span>
                                    <span>
                                        applied on {application.created_at}
                                    </span>
                                </h4>
                                <h5 className="mb-1 text-sm font-medium">Cover letter</h5>
                                <p className="my-3 text-primary text-md">
                                    {application.cover_letter.split('\n').map(line => (<>{line}<br/></>))}
                                </p>
                                <Status application={application} />

                            </div>
                        ))}
                </div>
            </>
        )
}

function Status({application}) {
    const [status, setStatus] = useState({
        initialValue: application.status,
        futureValue: null,
        isUpdating: false
    });

    const addNotification = useAddNotification();

    const updateApplicationStatus = (id, status, onSuccess) => {
        router.patch(
            `/applications/${id}`,
            {
                'status': status
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    if(onSuccess)
                    {
                        onSuccess();
                    }
                },
                onError: () => {

                }
            }
        );
    }

    const reject = (application) => {
        setStatus({...status, isUpdating: true, futureValue: 'rejected'});
        updateApplicationStatus(application.id, 'rejected', () => {
            addNotification({
                message: "Application rejected"
            });
            setStatus({...status, isUpdating: false, futureValue: null, initialValue: 'rejected'});
        });


    }

    const approve = (application) => {
        setStatus({...status, isUpdating: true, futureValue: 'approved'});
        updateApplicationStatus(application.id, 'approved', () => {
            addNotification({
                message: "Application Approved"
            });
            setStatus({...status, isUpdating: false, futureValue: null, initialValue: 'approved'});
        });
    }

    return (
        <>
            {application.status === 'pending'
                ? <div className="flex gap-2 mt-5 pt-5 border-t border-t-black/10">
                    <button
                        className="bg-green-800 text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer disabled:opacity-50"
                        disabled={status.isUpdating}
                        onClick={() => approve(application)}
                    >
                        {status.isUpdating && status.futureValue === 'approved' ? 'Approving...' : 'Approve'}
                    </button>
                    <button
                        className="bg-amber-900 text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer disabled:opacity-50"
                        disabled={status.isUpdating}
                        onClick={() => reject(application)}
                    >
                        {status.isUpdating && status.futureValue === 'rejected' ? 'Rejecting...' : 'Reject'}
                    </button>
                </div>
                : <div
                    className={`mt-5 pt-5 border-t border-t-black/10 text-${application.status}`}>You {application.status} the
                    application on {application.updated_at}</div>
            }
        </>
    )
}

function CoverLetter({application, onUpdate}) {
    const [errors, setErrors] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const addNotification = useAddNotification();

    const handleResolve = () => {
        addNotification({
            message: "Cover Letter Updated"
        })
        if (onUpdate) {
            onUpdate();
        }
    }

    const handleError = (response) => {
        if (response.errors) {
            setErrors(response.errors);
        }
    }

    return (
        <div className="my-4 p-3 border border-black/10 rounded-xl">
            <h4 className="mb-1 text-xs text-primary font-medium">Cover Letter</h4>
            {application.authUser.can.update_cover_letter && isEditable
                ? <RequestForm action={`/applications/${application.id}`} wide method="patch"
                               onResolve={handleResolve.bind(this)} onError={handleError.bind(this)}>

                    <FormControl name="cover_letter" type="textarea" initialValue={application.cover_letter}
                                 placeholder="Write your cover letter..."
                                 error={errors['cover_letter']}/>

                    <FormActions>
                        <Button label="Update Cover Letter"/>
                        <Button type="button" variant="alternate" label="Cancel" onClick={() => setIsEditable(false)}/>
                    </FormActions>
                </RequestForm>
                : <div>
                    <p className="my-3 text-primary text-md">
                        {application.cover_letter.split('\n').map(line => (<>{line}<br/></>))}
                    </p>
                    {application.authUser.can.update_cover_letter &&
                        <Button label="Edit" variant="alternate" onClick={() => setIsEditable(true)}/>}
                </div>}
        </div>
    )
}

function WithdrawApplication({application}) {
    const addNotification = useAddNotification();

    const withdrawApplication = () => {
        router.delete(`/applications/${application.id}`);
        addNotification({
            message: "Application withdrawn",
        })
    }

    return (
        <ConfirmButton label="Withdraw Application" onConfirm={() => withdrawApplication()} />
    )
}

function ApplicationForm({jobId}) {
    const [errors, setErrors] = useState({});
    const [isApplying, setIsApplying] = useState(false);
    const addNotification = useAddNotification();

    const handleResolve = () => {
        router.get(`/jobs/${jobId}`);
        addNotification({
            message: "Application submitted successfully",
            type: "success"
        })
    }

    const handleError = (response) => {
        if (response.errors) {
            setErrors(response.errors);
        }
    }

    const handleApplyButtonClick = () => {
        setIsApplying(true);
    }

    const handleCancelButtonClick = () => {
        setIsApplying(false);
    }

    if (isApplying) {
        return (
            <div className="p-5 border border-black/10 rounded-2xl">
                <RequestForm action={`/applications`} wide method="post"
                             onResolve={handleResolve.bind(this)} onError={handleError.bind(this)}>
                    <input type="hidden" name="job_id" value={jobId}/>
                    <FormControl name="cover_letter" type="textarea"
                                 placeholder="Write your cover letter..."
                                 error={errors['cover_letter']}/>

                    <FormActions>
                        <Button label="Submit Application"/>
                        <Button type="button" variant="alternate" label="Cancel" onClick={handleCancelButtonClick}/>
                    </FormActions>
                </RequestForm>
            </div>
        );
    }

    return (<Button label="Apply Now" type="button" onClick={handleApplyButtonClick}/>);
}
