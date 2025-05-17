import CardJob from "@/Shared/CardJob.jsx";

export default function JobListings({jobs, title, displayAs = 'grid', withSorting, count}) {
    const sortingControls = withSorting !== undefined ? <div>Sorted by Newest First</div> : '';
    const countComponent = count !== undefined ? <span className="inline-flex px-4 py-1 border border-body-text rounded-full text-lg font-bold text-primary">{count}</span> : ''
    const titleComponent = title !== undefined ? <header className="flex justify-between mx-5 my-9">
        <div className="flex space-x-4 items-center">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            {countComponent}
        </div>
        {sortingControls}
    </header> : '';
    return (
        <article>
            {titleComponent}
            <section className={displayAs === 'list' ? 'space-y-5' : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
                {jobs.map(job => <CardJob key={job.id} job={job}
                                          variant={displayAs === 'list' ? 'wide' : 'standard'}/>)}
            </section>
        </article>
    )
}
