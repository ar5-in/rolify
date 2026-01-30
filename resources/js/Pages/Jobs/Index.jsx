import JobListings from "@/Shared/JobListings.jsx";
import {Head} from "@inertiajs/react";

const Index = ({ jobs, featuredJobs }) => {
    return <>
        <Head title="Get Hired! Find the perfect job" />
        {featuredJobs.data.length > 0 ? <JobListings title="Featured Jobs" jobs={featuredJobs.data} displayAs="list" scrollable /> : null}
        <JobListings title="Recommended Jobs" jobs={jobs.data} displayAs="grid" withSorting paginationMeta={jobs.meta} count={jobs.meta.total} />
    </>
}

export default Index;
