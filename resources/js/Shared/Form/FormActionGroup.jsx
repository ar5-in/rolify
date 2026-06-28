export default function FormActionGroup({children}) {
    return (
        <div className="flex flex-col md:flex-row gap-2 sticky bottom-0 bg-body-bg">{children}</div>
    );
}
