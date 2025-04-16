import {Link} from "@inertiajs/react";
import Panel from "@/Shared/Panel.jsx";
import Tag from "@/Shared/Tag.jsx";

const CardJob = ({ job }) => {
    const className = 'flex flex-col ' +
        '[&:nth-child(1n)>div:first-child]:bg-[#ffe1cb] ' +
        '[&:nth-child(2n)>div:first-child]:bg-[#d5f6ed] ' +
        '[&:nth-child(3n)>div:first-child]:bg-[#e2dbf9] ' +
        '[&:nth-child(4n)>div:first-child]:bg-[#e0f3ff] ' +
        '[&:nth-child(5n)>div:first-child]:bg-[#fbe2f3] ' +
        '[&:nth-child(6n)>div:first-child]:bg-[#eceff5]';
    return (
        <Panel attrClassName={className}>
            <div className="flex-1 flex flex-col p-5 rounded-xl space-y-5">
                <div className="flex justify-between items-center">
                    <div
                        className="bg-body-bg px-2 py-1 rounded-full text-sm font-medium text-primary">{job.created_at}</div>
                    {/* TODO Add Save Job toggle */}
                </div>
                <div className="">
                    <div className="">
                        <div className="mb-1 text-xs font-bold text-primary">{job.employer.name}</div>
                        <img className="inline-block rounded-full float-right" src={job.employer.logo_url}
                             alt={`${job.employer.name} Logo`}/>
                        <h2 className="text-2xl font-medium text-primary break-words">{job.title}</h2>
                    </div>
                </div>
                <div className="flex flex-wrap items-start mt-auto space-x-2 space-y-2">
                    {job.tags.map(tag => <Tag key={tag.id} tag={tag} />)}
                </div>
            </div>

            <div className="flex p-5 justify-between items-end space-x-1">
                <div>
                    <div className="font-bold text-primary">{job.compensation}</div>
                    <div className="text-sm">{job.location}</div>
                </div>
                <Link className="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg font-bold"
                   href={`/jobs/${job.id}`}>Details</Link>
            </div>
        </Panel>
    );
}

export default CardJob;
