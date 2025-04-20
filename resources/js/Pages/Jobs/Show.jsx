import Page from "@/Shared/Page.jsx";
import Tags from "@/Shared/Tags.jsx";

const Show = ({ job }) => {
    return <Page heading={`${job.title} (${job.employer.name})`}>
        <Tags tags={job.tags} />
        <p className="text-xl">
            Based in <strong class="text-primary">{job.location}</strong>,
            compensates <strong class="text-primary">{job.compensation}</strong>
        </p>
    </Page>
}

export default Show;
