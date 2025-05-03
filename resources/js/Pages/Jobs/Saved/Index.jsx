import JobListings from "@/Shared/JobListings.jsx";
import {useEffect, useState} from "react";
import {useSavedJobs} from "@/Shared/SavedJobs/SavedJobsContext.jsx";

export default function Index({jobs}) {
    const [filteredJobs, setFilteredJobs] = useState(jobs);
    const {savedJobs} = useSavedJobs();

    useEffect(() => {
        setFilteredJobs(fjs => fjs.filter(fj => savedJobs.some(sjId => fj.id === sjId)));
    }, [savedJobs]);

    return (
        <JobListings title="Saved Jobs" jobs={filteredJobs} displayAs="list" withSorting count={filteredJobs.length} />
    )
}
