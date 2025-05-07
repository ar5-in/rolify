import PageHeading from "@/Shared/PageHeading.jsx";

export default function Page({heading, children, topControls}) {
    return <article>
        <div className="flex items-center">
            {topControls}
            <PageHeading>{heading}</PageHeading>
        </div>
        <section className="m-5 space-y-5">{children}</section>
    </article>
}
