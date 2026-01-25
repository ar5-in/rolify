import {
    useSavedJobs,
    useToggleSaveJob
} from "@/Shared/SavedJobs/SavedJobsContext.jsx";

export default function ToggleSaveJob({label, jobId}) {
    const {savedJobs} = useSavedJobs();
    const {toggleSaveJob} = useToggleSaveJob();
    const isSaved = savedJobs.some(sj => sj === jobId);
    const iconSaved = new URL(`/resources/images/icon-saved.svg`, import.meta.url).href;
    const iconSave = new URL(`/resources/images/icon-save.svg`, import.meta.url).href;

    return (
        <button
            className={`shrink-0 cursor-pointer flex items-center justify-center gap-2
                        ${label ? 'px-4 py-2' : 'size-10'}
                        bg-body-bg border border-black/20 hover:border-black/40 rounded-full
                        transition-colors duration-300`}
            onClick={() => toggleSaveJob(jobId)}
        >
            <img
                className="inline-block"
                src={isSaved ? iconSaved : iconSave}
                alt="Save Job"/>

            {label && <span className={`font-bold text-lg text-primary`}>{label}</span>}
        </button>
    )
}
