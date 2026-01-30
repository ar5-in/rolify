import JobListings from "@/Shared/JobListings.jsx";

export default function Index({tag, jobs}) {
    return (
        <JobListings title={`Jobs tagged '${tag.name}'`} jobs={jobs.data} displayAs="list" withSorting count={jobs.meta.total} paginationMeta={jobs.meta} />
    )
}
