import CardJob from "@/Shared/CardJob.jsx";
import JobListings from "@/Shared/JobListings.jsx";

const Index = ({ jobs, featuredJobs }) => {
    return <>
        <JobListings title="Featured Jobs" jobs={featuredJobs} displayAs="list" />
        <JobListings title="Recommended Jobs" jobs={jobs} displayAs="grid" withSorting count={jobs.length} />
    </>
}

export default Index;
