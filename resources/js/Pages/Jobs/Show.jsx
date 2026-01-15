import Page from "@/Shared/Page.jsx";
import Tags from "@/Shared/Tags.jsx";
import {Head, Link, usePage} from "@inertiajs/react";
import ToggleSaveJob from "@/Shared/SavedJobs/ToggleSaveJob.jsx";
import JobApplicationControls from "@/Shared/JobApplications/JobApplicationControls.jsx";
import JobControls from "@/Shared/Jobs/JobControls.jsx";
import Button from "../../Shared/Button.jsx";

const Show = ({job}) => {
    const {auth} = usePage().props;

    return (
        <>
            <Head title={`${job.title} (${job.employer.name}) - Rolify`} />
            <Page heading={`${job.title} (${job.employer.name})`} topControls={<ToggleSaveJob jobId={job.id}/>}>
                <Tags tags={job.tags}/>

                <p className="my-10 text-xl">
                    Based in <strong className="text-primary">{job.location}</strong>,
                    compensates <strong className="text-primary">{job.compensation}</strong>
                </p>

                {auth.user !== null ? <>
                    <JobControls job={job}/>
                    <JobApplicationControls job={job}/>
                </> : <Button type="link" href={`/login`} label="Login to Apply" />}

            </Page>
        </>
    )
}

export default Show;
