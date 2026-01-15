import {
    useSavedJobs,
    useToggleSaveJob
} from "@/Shared/SavedJobs/SavedJobsContext.jsx";

export default function ToggleSaveJob({jobId}) {
    const {savedJobs} = useSavedJobs();
    const {toggleSaveJob} = useToggleSaveJob();
    const isSaved = savedJobs.some(sj => sj === jobId);
    const iconSaved = new URL(`/resources/images/icon-saved.svg`, import.meta.url).href;
    const iconSave = new URL(`/resources/images/icon-save.svg`, import.meta.url).href;

    return (
        <button className="shrink-0 cursor-pointer" onClick={() => toggleSaveJob(jobId)}>
            <img
                className="inline-block w-[44px] p-2 bg-body-bg border border-black/20 hover:border-black/40 rounded-full transition-colors duration-300"
                src={isSaved ? iconSaved : iconSave}
                alt="Save Job"/>
        </button>
    )
}
