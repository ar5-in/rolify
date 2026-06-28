import {Head, Link} from "@inertiajs/react";
import Page from "../../Shared/Page.jsx";
import moment from "moment";

export default function Index({jobApplications}) {

    const statusClasses = {
        approved: 'bg-approved',
        rejected: 'bg-rejected',
        pending: 'bg-body-text'
    }

    return <>
        <Head title={`My Applications`}/>
        <Page heading={`My Applications`}>
            {jobApplications.length > 0 ? (
                <section className="mx-5">
                    {jobApplications.map(jobApplication => <div key={jobApplication.id} className="flex justify-between items-center border-t border-t-black/10 py-5">
                        <Link key={jobApplication.id}
                              href={`/jobs/${jobApplication.job.id}`} className={`flex flex-col ${jobApplication.status === 'rejected' && 'line-through'}`}>
                            <span>
                                <strong className={jobApplication.status !== 'rejected' && 'text-primary'}>{jobApplication.job.title}</strong> ({jobApplication.job.employer.name})
                            </span>
                            <span>applied {moment(jobApplication.created_at).fromNow()}</span>
                        </Link>

                        <span
                            className={ 'text-sm px-4 py-1 rounded-full text-white ' + statusClasses[jobApplication.status]}>{jobApplication.status}</span>
                    </div>)}
                </section>
            ) : (
                <div className="p-5 border-t border-black/10 font-bold text-xl">Apply for your first job and track it's status here!</div>
            )}
        </Page>
    </>
}
