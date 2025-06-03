import JobListings from "@/Shared/JobListings.jsx";

export default function Index({tag, jobs}) {
    return (
        <JobListings title={`Jobs tagged '${tag.name}'`} jobs={jobs} displayAs="list" withSorting count={jobs.length} />
    )
}
