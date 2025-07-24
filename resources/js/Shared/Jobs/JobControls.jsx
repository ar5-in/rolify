import {Link} from "@inertiajs/react";

export default function JobControls({ job }) {
    const canEdit = job.authUser && job.authUser.can.update;

    if(canEdit)
        return (
        <div className="flex flex-col md:flex-row mt-5 justify-between">
            <Link className="inline-block bg-primary text-body-bg px-6 py-2 rounded-full text-lg text-center font-bold cursor-pointer"
                  href={`/jobs/${job.id}/edit`}>Edit Job</Link>
        </div>
    )

    return null;
}
