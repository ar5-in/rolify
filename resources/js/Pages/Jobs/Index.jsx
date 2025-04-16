import CardJob from "@/Shared/CardJob.jsx";

const Index = ({ jobs, featuredJobs }) => {
    return <>
        <section className="grid gap-6 lg:grid-cols-4">
            {jobs.map(job => <CardJob key={job.id} job={job} />)}
        </section>
    </>
}

export default Index;
