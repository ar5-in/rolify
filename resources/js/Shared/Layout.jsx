import SiteHeader from "../Shared/SiteHeader";

export default function Layout({heading, children}) {
    return <>
        <SiteHeader />
        <main>
            <section className="m-5 space-y-5">
                {children}
            </section>
        </main>
    </>
}
