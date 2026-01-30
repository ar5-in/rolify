import {Link} from "@inertiajs/react";

export default function Pagination({current, uri, lastPage,}) {

    const firstPageLink = current > 1 ? `${uri}?page=1` : null;
    const lastPageLink = current < lastPage ? `${uri}?page=${lastPage}` : null;
    const previousPageLink = current > 1 ? `${uri}?page=${current - 1}` : null;
    const nextPageLink = current < lastPage ? `${uri}?page=${current + 1}` : null;
    let pages = getPageRange(current, lastPage, 5);

    return (
        <>
            <div className={`flex mt-5 gap-2 text-center max-md:justify-stretch md:justify-end`}>
                <PaginationLink url={firstPageLink} label={<> First</>}/>
                <PaginationLink url={previousPageLink} label={<> Previous</>}/>
                <div className={`hidden md:flex gap-2`}>
                    <div className={`border-l border-l-black/10 ml-1 pl-1`}></div>
                    {pages.map(page => <PaginationLink key={page} url={`${uri}?page=${page}`} label={<>{page}</>}
                                                       active={current === page}/>)}
                    <div className={`border-l border-l-black/10 ml-1 pl-1`}></div>
                </div>
                <PaginationLink url={nextPageLink} label={<>Next </>}/>
                <PaginationLink url={lastPageLink} label={<>Last </>}/>
            </div>
        </>
    );
}

function getPageRange(current, last, size) {
    if (size > last) {
        return Array.from({length: last}, (_, i) => i + 1);
    }

    const midpoint = Math.floor(size / 2);
    let start = current - midpoint;
    let end = start + size - 1;

    if (start < 1) {
        start = 1;
        end = size;
    }
    if (end > last) {
        end = last;
        start = end - size + 1;
    }

    return Array.from({length: end - start + 1}, (_, i) => start + i);
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
