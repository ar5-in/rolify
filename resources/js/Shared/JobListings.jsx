import CardJob from "@/Shared/CardJob.jsx";

export default function JobListings({jobs, title, displayAs = 'grid', withSorting, count}) {
    const sortingControls = withSorting !== undefined ? <div className="text-xs">Newest First</div> : null;
    const countComponent = count !== undefined
        ? <span className="inline-flex px-3 md:px-4 py-1 border border-body-text rounded-full text-sm md:text-lg font-bold text-primary">{count}</span>
        : '';

    const titleComponent = title !== undefined
        ?   <header className="flex flex-col md:flex-row md:items-center justify-between mx-4 my-7 md:my-9">
                <div className="flex space-x-4 items-start justify-between">
                    <h1 className="text-xl md:text-3xl font-bold text-primary">{title}</h1>
                    {countComponent}
                </div>
                <div className="">
                    {sortingControls}
                </div>
            </header>
        : '';

    const classes = displayAs === 'list'
        ? 'flex md:flex-col gap-5 -mx-5 pb-5 px-5 md:mx-0 md:pb-0 md:px-0 overflow-x-auto md:overflow-x-visible'
        : 'grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

    return (
        <article className="mx-5 my-10 md:my-12">
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
