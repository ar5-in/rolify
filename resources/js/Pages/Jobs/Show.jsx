import Page from "@/Shared/Page.jsx";
import Tags from "@/Shared/Tags.jsx";
import {Link} from "@inertiajs/react";
import ToggleSaveJob from "@/Shared/SavedJobs/ToggleSaveJob.jsx";

const Show = ({ job }) => {
    return <Page heading={`${job.title} (${job.employer.name})`}>
        <div>
            <ToggleSaveJob jobId={job.id} />
        </div>
        <Tags tags={job.tags}/>
        <p className="text-xl">
            Based in <strong className="text-primary">{job.location}</strong>,
            compensates <strong className="text-primary">{job.compensation}</strong>
        </p>
        {job.authUser && job.authUser.can.update ? <div className="flex mt-5 justify-between">
            <Link className="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold cursor-pointer"
               href={`/jobs/${job.id}/edit`}>Edit Job</Link>
        </div> : null}

    </Page>
}

export default Show;
