export default function Panel({className, children}) {
    className += ' border border-body-text/30 p-1.5 rounded-2xl hover:border-body-text/70 transition-colors duration-500';
    return <div className={className}>{children}</div>
}
