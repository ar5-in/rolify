import PageHeading from "@/Shared/PageHeading.jsx";

export default function Page({heading, children}) {
    return <article>
        <PageHeading>{heading}</PageHeading>
        <section className="m-5 space-y-5">{children}</section>
    </article>
}
