import PageHeading from "@/Shared/PageHeading.jsx";

export default function Page({heading, children, topControls}) {
    return <article className="mx-5 my-10 md:my-12">
        <div className="flex items-center">
            {topControls}
            <PageHeading>{heading}</PageHeading>
        </div>
        <section>{children}</section>
    </article>
}
