import {
    useSavedJobs,
    useToggleSaveJob
} from "@/Shared/SavedJobs/SavedJobsContext.jsx";

export default function ToggleSaveJob({jobId}) {
    const {savedJobs} = useSavedJobs();
    const {toggleSaveJob} = useToggleSaveJob();
    const isSaved = savedJobs.some(sj => sj === jobId);

    return (
        <button className="cursor-pointer" onClick={() => toggleSaveJob(jobId)}>
            <img
                className="inline-block w-[44px] p-2 bg-body-bg border border-black/20 hover:border-black/40 rounded-full"
                src={new URL(isSaved ? `/resources/images/icon-saved.svg` : `/resources/images/icon-save.svg`, import.meta.url).href}
                alt="Save Job"/>
        </button>
    )
}
