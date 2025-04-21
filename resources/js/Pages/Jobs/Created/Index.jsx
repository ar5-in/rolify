import JobListings from "@/Shared/JobListings.jsx";

export default function Index({jobs}) {
    return (
        <JobListings title="My Jobs" jobs={jobs} displayAs="list" withSorting count={jobs.length} />
    )
}
