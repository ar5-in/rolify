export default function Panel({attrClassName, children}) {
    const className = 'border border-body-text/30 p-1.5 rounded-2xl hover:border-body-text/70 transition-colors duration-500 ' + attrClassName;
    return <div className={className}>{children}</div>
}
