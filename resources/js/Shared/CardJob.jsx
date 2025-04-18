import {Link} from "@inertiajs/react";
import Tag from "@/Shared/Tag.jsx";
import Card from "@/Shared/Card.jsx";
import CardHead from "@/Shared/CardHead.jsx";
import CardFooter from "@/Shared/CardFooter.jsx";

const CardJob = ({job, variant = 'standard'}) => {
    /* Alternate colors between cards */
    const className = '[&:nth-child(1n)>div:first-child]:bg-[#ffe1cb] ' +
        '[&:nth-child(2n)>div:first-child]:bg-[#d5f6ed] ' +
        '[&:nth-child(3n)>div:first-child]:bg-[#e2dbf9] ' +
        '[&:nth-child(4n)>div:first-child]:bg-[#e0f3ff] ' +
        '[&:nth-child(5n)>div:first-child]:bg-[#fbe2f3] ' +
        '[&:nth-child(6n)>div:first-child]:bg-[#eceff5]';

    const jobTitle = variant === 'wide'
        ? <>
            <div className="shrink-0">
                <img className="inline-block rounded-full float-right" src={job.employer.logo_url}
                     alt={`${job.employer.name} Logo`}/>
            </div>
            <div className="mt-2.5">
                <div className="mb-1 text-xs font-bold text-primary">{job.employer.name}</div>
                <h2 className="text-3xl font-medium text-primary">{job.title}</h2>
            </div>
        </>
        :
        <div className="">
            <div className="mb-1 text-xs font-bold text-primary">{job.employer.name}</div>
            <img className="inline-block rounded-full float-right" src={job.employer.logo_url}
                 alt={`${job.employer.name} Logo`}/>
            <h2 className="text-2xl font-medium text-primary break-words">{job.title}</h2>
        </div>

    return (
        <Card className={className} variant={variant}>
            <CardHead>
                <div
                    className={variant === 'wide' ? 'flex flex-col-reverse justify-end items-center gap-2' : 'flex justify-between items-center'}>
                    <div
                        className="bg-body-bg px-2 py-1 rounded-full text-sm font-medium text-primary">{job.created_at}</div>
                    {/* TODO Add Save Job toggle */}
                </div>
                <div className={variant === 'wide' ? '' : ''}>
                    {jobTitle}
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
                <Link className="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold"
                      href={`/jobs/${job.id}`} preserveScroll>Details</Link>
            </CardFooter>
        </Card>
    );
}

export default CardJob;
