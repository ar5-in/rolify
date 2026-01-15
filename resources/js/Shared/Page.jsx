import PageHeading from "@/Shared/PageHeading.jsx";

export default function Page({heading, children, topControls}) {
    return <article className="mx-auto mb-10 md:mb-12 px-5 md:px-[3dvw] max-w-[96rem]">
        <div className="flex items-center gap-3">
            {topControls}
            <PageHeading>{heading}</PageHeading>
        </div>
        <section>{children}</section>
    </article>
}
