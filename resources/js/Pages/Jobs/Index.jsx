import JobListings from "@/Shared/JobListings.jsx";
import {Head} from "@inertiajs/react";

const Index = ({ jobs, featuredJobs }) => {
    const rolifyLogo = new URL(`/resources/images/rolify_logo.svg`, import.meta.url).href;
    const bannerHandshake = new URL(`/resources/images/banner-interview.webp`, import.meta.url).href;
    return <>
        <Head title="Get Hired! Find the perfect job" />
        <div className={`mx-5 md:mx-auto mb-10 md:mb-12 md:px-[3dvw] max-w-[96rem]`}>
            <div
                className={`relative my-10 p-6 md:p-12 flex flex-col items-end justify-end md:justify-center aspect-4/3 md:aspect-25/9
                            overflow-hidden bg-black/50
                            text-header-text rounded-2xl`}>
                <img className={`w-20 md:w-50 invert`} src={rolifyLogo} alt="Rolify Logo" />
                <p className={`text-right`}>
                    <span className={`block mb-2 text-4xl md:text-6xl font-bold`}>Get Hired!</span>
                    <span className={`block mb-2 text-xl md:text-2xl`}>Find the perfect job</span>
                </p>
                <div className={`absolute top-0 left-0 h-full w-full -z-10 bg-header-bg bg-left bg-cover md:bg-contain bg-no-repeat
                `} style={{backgroundImage: `url(${bannerHandshake})`}}></div>
            </div>
        </div>
        {featuredJobs.data.length > 0 ? <JobListings title="Featured Jobs" jobs={featuredJobs.data} displayAs="list" scrollable /> : null}
        <JobListings title="Recommended Jobs" jobs={jobs.data} displayAs="grid" withSorting paginationMeta={jobs.meta} count={jobs.meta.total} />
    </>
}

export default Index;
