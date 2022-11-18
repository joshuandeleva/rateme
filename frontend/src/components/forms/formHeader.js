
function formHeader(props) {
    const className = `${props.className}`
    return (
        <div>
            <p className={className}>{props.Children}</p>
        </div>
    )
}

export default formHeader