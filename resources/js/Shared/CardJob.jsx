import {Link} from "@inertiajs/react";
import Tag from "@/Shared/Tag.jsx";
import Card from "@/Shared/Card.jsx";
import CardHead from "@/Shared/CardHead.jsx";
import CardFooter from "@/Shared/CardFooter.jsx";
import ToggleSaveJob from "@/Shared/SavedJobs/ToggleSaveJob.jsx";
import moment from "moment";

const CardJob = ({job, variant = 'standard', scrollable}) => {
    /* Alternate colors between cards */
    const className = '[&:nth-child(1n)>div:first-child]:bg-[#ffe1cb] ' +
        '[&:nth-child(2n)>div:first-child]:bg-[#d5f6ed] ' +
        '[&:nth-child(3n)>div:first-child]:bg-[#e2dbf9] ' +
        '[&:nth-child(4n)>div:first-child]:bg-[#e0f3ff] ' +
        '[&:nth-child(5n)>div:first-child]:bg-[#fbe2f3] ' +
        '[&:nth-child(6n)>div:first-child]:bg-[#eceff5]';

    return (
        <Card className={className} variant={variant} {...(scrollable !== undefined ? { scrollable }: {})}>
            <CardHead>
                <div
                    className={variant === 'wide' ? 'flex md:flex-col-reverse justify-between md:justify-end items-center gap-2' : 'flex justify-between items-center'}>
                    <div
                        className="bg-body-bg px-2 py-1 rounded-full text-sm font-medium text-primary">{moment.utc(job.created_at).local().format('MMM DD, YYYY')}</div>
                    <ToggleSaveJob jobId={job.id} />
                </div>
                <div className={variant === 'wide' ? "flex-1" : null}>
                    <div className="mb-1 text-xs font-bold text-primary">{job.employer.name}</div>
                    {job.employer.logo_url !== null ? <img className="mr-2 rounded-full float-right size-8 md:size-10 object-cover" src={job.employer.logo_url}
                                                       alt={`${job.employer.name} Logo`}/> : <div
                        className={`mr-2 size-8 md:size-10 flex justify-center items-center rounded-full text-xs md:text-sm font-bold float-right`}
                        style={{
                            backgroundColor: job.employer.background,
                            color: job.employer.foreground
                        }}>{job.employer.initials}</div>}
                    <h2 className="text-xl md:text-2xl font-medium text-primary break-words">{job.title}</h2>
                </div>
                <div
                    className={variant === 'wide' ? 'flex flex-1 flex-wrap items-start space-x-2 space-y-2' : 'flex flex-wrap items-start mt-auto space-x-2 space-y-2'}>
                    {job.tags.map(tag => <Tag key={tag.id} tag={tag}/>)}
                </div>
            </CardHead>
            <CardFooter>
                <div>
                    <div className="font-bold text-primary">{job.compensation}</div>
                    <div className="text-sm">{job.location}</div>
                </div>
                <Link className="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0.5"
                      href={`/jobs/${job.id}`} preserveScroll>Details</Link>
            </CardFooter>
        </Card>
    );
}

export default CardJob;
