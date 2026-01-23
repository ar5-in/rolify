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
                            Based in <strong className="text-primary">{job.location}</strong>,
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
                        <p className={`pb-4`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem
                            blanditiis dicta dolore dolores error ex explicabo harum maxime mollitia neque obcaecati
                            quas quasi qui tempore ut voluptate, voluptatibus. Delectus!</p>
                        <h4 className={`pb-2 font-medium text-lg text-primary`}>Another Heading</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem blanditiis dicta
                            dolore dolores error ex explicabo harum maxime mollitia neque obcaecati quas quasi qui
                            tempore ut voluptate, voluptatibus. Delectus!</p>
                        <ul className={`ml-8 py-4 flex flex-col gap-2 list-disc`}>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Assumenda autem blanditiis dicta dolore</li>
                            <li>mollitia neque obcaecati quas</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Assumenda autem blanditiis dicta dolore</li>
                            <li>mollitia neque obcaecati quas</li>
                        </ul>
                    </div>

                </div>

            </Page>
        </>
    )
}

export default Show;
