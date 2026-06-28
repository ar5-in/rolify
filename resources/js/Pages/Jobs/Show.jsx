import Page from "@/Shared/Page.jsx";
import Tags from "@/Shared/Tags.jsx";
import {Head, usePage} from "@inertiajs/react";
import JobApplicationControls from "@/Shared/JobApplications/JobApplicationControls.jsx";
import JobControls from "@/Shared/Jobs/JobControls.jsx";
import Button from "../../Shared/Button.jsx";
import FormActionGroup from "../../Shared/Form/FormActionGroup.jsx";

const Show = ({job}) => {
    const {auth} = usePage().props;

    return (
        <>
            <Head title={`${job.title} (${job.employer.name}) - Rolify`}/>
            <Page heading={`${job.title} (${job.employer.name})`}>
                <div className={`md:flex flex-row-reverse`}>
                    <div className={`flex-1 mb-8 md:p-8`}>
                        <Tags tags={job.tags}/>

                        <p className="my-5 text-xl">
                            {job.location === 'Remote'
                                ? <>Work <strong className="text-primary">remotely</strong> from anywhere</>
                                : <>Based in <strong className="text-primary">{job.location}</strong></>},
                            compensates <strong className="text-primary">{job.compensation}</strong>
                        </p>

                        {auth.user !== null ? <>
                            <JobControls job={job}/>
                            <JobApplicationControls job={job}/>
                        </> : <FormActionGroup>
                            <Button type="link" href={`/login`} label="Login to Apply"/>
                        </FormActionGroup>}
                    </div>

                    <div className={`flex-1 bg-white p-8 min-h-dvh rounded-2xl`}>
                        <h3 className={`pb-4 font-medium text-xl text-primary`}>Introduction</h3>
                        <p className={`pb-4`}>
                            {job.location === 'Remote'
                                ? <><span className="text-primary">{job.employer.name}</span> is looking for a talent to fill
                                    the position of <span className="text-primary">{job.title}</span>. This is a <span className="text-primary">remote position</span> and you can work from anywhere</>
                                : <><span className="text-primary">{job.employer.name}</span> is looking for a talent to fill
                                    the position of <span className="text-primary">{job.title}</span> in <span className="text-primary">{job.location}</span></>}.
                            The compensation for the role is <span className="text-primary">{job.compensation}</span>.
                            If have the skills to take on this role, submit your application now!</p>

                        <h4 className={`pb-2 font-medium text-lg text-primary`}>Important points about this job listing.</h4>
                        <p>All the jobs you see on this site are only created for demonstration purposes. No real job positions are filled and this website is not affiliated with any companies mentioned here.</p>
                        <ul className={`ml-8 py-4 flex flex-col gap-2 list-disc`}>
                            <li><strong className="text-primary">Demonstration Only:</strong> All job listings on this site are created strictly for testing and display purposes.</li>
                            <li><strong className="text-primary">No Real Hiring:</strong> No actual job positions are available or being filled through this platform.</li>
                            <li><strong className="text-primary">No Company Affiliation:</strong> This website is completely independent and not affiliated with or endorsed by any companies mentioned.</li>
                            <li><strong className="text-primary">Portfolio Showcase:</strong> Developed using Laravel as a personal project to demonstrate full-stack web development skills.</li>
                            <li><strong className="text-primary">Mock Data:</strong> All company names, logos, and descriptions are used purely as placeholder content.</li>
                        </ul>
                    </div>

                </div>

            </Page>
        </>
    )
}

export default Show;
