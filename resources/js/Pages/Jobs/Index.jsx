import JobListings from "@/Shared/JobListings.jsx";
import {Head} from "@inertiajs/react";

const Index = ({ jobs, featuredJobs }) => {
    return <>
        <Head title="Get Hired! Find your job on Rolify" />
        {featuredJobs.length > 0 ? <JobListings title="Featured Jobs" jobs={featuredJobs} displayAs="list" scrollable /> : null}
        <JobListings title="Recommended Jobs" jobs={jobs} displayAs="grid" withSorting count={jobs.length} />
    </>
}

export default Index;
