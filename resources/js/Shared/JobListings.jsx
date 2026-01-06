import CardJob from "@/Shared/CardJob.jsx";
import {Link} from "@inertiajs/react";

export default function JobListings({jobs, title, displayAs = 'grid', withSorting, paginationMeta, scrollable, count}) {
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
        ? 'flex md:flex-col ' + (scrollable !== undefined ? '' : 'flex-wrap') + ' gap-5 -mx-5 pb-5 px-5 md:mx-0 md:pb-0 md:px-0 overflow-x-auto md:overflow-x-visible'
        : 'grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

    return (
        <article className="mx-5 my-10 md:my-12">
            {titleComponent}
            {jobs.length > 0 ? (
                <section className={classes}>
                    {jobs.map(job => <CardJob key={job.id} job={job}
                    variant={displayAs === 'list' ? 'wide' : 'standard'} {...scrollable !== undefined ? {scrollable} : {}} />)}
                </section>
            ) : (
                <div className="p-5 border-t border-black/10 font-bold text-xl">It's empty</div>
            )}
            {paginationMeta !== undefined ? <Pagination meta={paginationMeta} /> : null}
        </article>
    )
}

function Pagination({meta}) {
    /*
        current_page === last_page : isLastPage TRUE

        first page url: path + '?page=1'
        last page url: path + '?page=' + last_page

            index === current_page : active TRUE
            url: path + '?page=' + index

        last_page
        total
     */

    const previousPageLink = meta.current_page > 1 ? `${meta.path}?page=${meta.current_page - 1}` : null;
    const nextPageLink = meta.current_page < meta.last_page ? `${meta.path}?page=${meta.current_page + 1}` : null;
    let pageLinks = [];
    let pages = getPageRange(meta.current_page, meta.last_page, 3);

    return (
        <>
            <div className={`flex mt-5 gap-2 max-md:justify-stretch md:justify-end`}>
                <PaginationLink url={previousPageLink} label={<> Previous</>} />
                {pages.map(page => <PaginationLink url={`${meta.path}?page=${page}`} label={<>{page}</>} active={meta.current_page === page} />)}
                <PaginationLink url={nextPageLink} label={<>Next </>} />
            </div>
            <pre>{JSON.stringify({pages: pages}, '', 2)}</pre>
        </>
    );
}

function getPageRange(current, last, size) {
    if(size > last)
    {
        return Array.from({length: last}, (_, i) => i + 1);
    }

    const midpoint = Math.floor(size / 2);
    let start = current - midpoint;
    let end = start + size - 1;

    if(start < 1)
    {
        start = 1;
        end = size;
    }
    if(end > last)
    {
        end = last;
        start = end - size;
    }

    console.log(start, end, {length: end - start});

    return Array.from({length: end - start}, (_, i) => start + i);
}

function PaginationLink({url, label, active = false, hideOnMobile = false}) {
    const classes = `${hideOnMobile ? 'hidden md:inline-block' : 'inline-block'} max-md:flex-1 p-2 px-5 rounded-full text-sm ${active ? 'bg-primary text-body-bg' : 'text-primary bg-black/5 hover:bg-black/10'}`;
    return url !== null
        ? <Link preserveScroll
            className={classes}
            href={url}
            >{label}</Link>
        : <span className={`${classes} bg-transparent hover:bg-transparent text-primary/50 cursor-not-allowed`}>
            {label}
        </span>
}
