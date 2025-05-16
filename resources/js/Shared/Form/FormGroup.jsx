export default function FormGroup ({label, children}) {
    return (
        <div className="p-5 mb-5 border border-black/10 rounded-2xl">
            <h3 className="flex gap-2 mb-2 text-sm text-primary font-medium">{label}</h3>
            {children}
        </div>
    )
}
