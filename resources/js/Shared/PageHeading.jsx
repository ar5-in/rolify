export default function PageHeading ({children}) {
    return <>
        <header className="flex justify-between mx-4 my-10 md:my-12 mb-7 md:mb-9">
            <div className="flex space-x-4 items-center">
                <h1 className="text-3xl font-bold text-primary">{children}</h1>
            </div>
        </header>
    </>
}
