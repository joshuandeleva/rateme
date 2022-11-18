function Button(props) {
    const className = `${props.className}`
    return (
        <button className={className} onClick={props.handleClick}>{props.children}</button>
    )

}
export default Button