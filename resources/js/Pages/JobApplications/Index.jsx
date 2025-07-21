import {Link} from "@inertiajs/react";

export default function Index({jobApplications}) {

    const statusClasses = {
        approved: 'bg-approved',
        rejected: 'bg-rejected',
        pending: 'bg-body-text'
    }

    return <article>
        <header className="flex justify-between mx-5 my-9">
            <div className="flex space-x-4 items-center">
                <h1 className="text-3xl font-bold text-primary">My Applications</h1>
            </div>
        </header>
        {jobApplications.length > 0 ? (
            <section className="mx-5">
                {jobApplications.map(jobApplication => <div key={jobApplication.id} className="flex justify-between items-center border-t border-t-black/10 py-5">
                    <Link key={jobApplication.id}
                          href={`/jobs/${jobApplication.job.id}`}><strong className="text-primary">{jobApplication.job.title}</strong> ({jobApplication.job.employer.name})</Link>

                    <span
                        className={ 'text-sm px-4 py-1 rounded-full text-white ' + statusClasses[jobApplication.status]}>{jobApplication.status}</span>
                </div>)}
            </section>
        ) : (
            <div className="p-5 border-t border-black/10 font-bold text-xl">Apply for your first job and track it's status here!</div>
        )}
    </article>
}
