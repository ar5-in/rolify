import CardJob from "@/Shared/CardJob.jsx";

export default function JobListings({jobs, title, displayAs = 'grid', withSorting, count}) {
    const sortingControls = withSorting !== undefined ? <div>Sorted by Newest First</div> : '';
    const countComponent = count !== undefined
        ? <span className="inline-flex px-4 py-1 border border-body-text rounded-full text-lg font-bold text-primary">{count}</span>
        : '';

    const titleComponent = title !== undefined
        ?   <header className="flex justify-between mx-5 my-9">
                <div className="flex space-x-4 items-center">
                    <h1 className="text-3xl font-bold text-primary">{title}</h1>
                    {countComponent}
                </div>
                {sortingControls}
            </header>
        : '';

    const classes = displayAs === 'list'
        ? 'flex md:flex-col gap-5 -mx-5 pb-5 px-5 md:mx-0 md:pb-0 md:px-0 overflow-x-auto md:overflow-x-visible'
        : 'grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

    return (
        <article>
            {titleComponent}
            {jobs.length > 0 ? (
                <section className={classes}>
                    {jobs.map(job => <CardJob key={job.id} job={job}
                    variant={displayAs === 'list' ? 'wide' : 'standard'}/>)}
                </section>
            ) : (
                <div className="p-5 border-t border-black/10 font-bold text-xl">It's empty</div>
            )}
        </article>
    )
}
