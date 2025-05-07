import Page from "@/Shared/Page.jsx";
import Tags from "@/Shared/Tags.jsx";
import {usePage} from "@inertiajs/react";
import ToggleSaveJob from "@/Shared/SavedJobs/ToggleSaveJob.jsx";
import JobApplicationControls from "@/Shared/JobApplications/JobApplicationControls.jsx";
import JobControls from "@/Shared/Jobs/JobControls.jsx";

const Show = ({ job }) => {
    const {auth} = usePage().props;

    return (
        <Page heading={`${job.title} (${job.employer.name})`} topControls={<ToggleSaveJob jobId={job.id}/>}>
            <Tags tags={job.tags}/>

            <p className="text-xl">
                Based in <strong className="text-primary">{job.location}</strong>,
                compensates <strong className="text-primary">{job.compensation}</strong>
            </p>

            {auth.user !== null && <>
                <JobControls job={job}/>
                <JobApplicationControls job={job}/>
            </>}

        </Page>
    )
}

export default Show;
