import Page from "@/Shared/Page.jsx";
import Tags from "@/Shared/Tags.jsx";

const Show = ({ job }) => {
    return <Page heading={`${job.title} (${job.employer.name})`}>
        <Tags tags={job.tags} />
        <p className="text-xl">
            Based in <strong className="text-primary">{job.location}</strong>,
            compensates <strong className="text-primary">{job.compensation}</strong>
        </p>
    </Page>
}

export default Show;
