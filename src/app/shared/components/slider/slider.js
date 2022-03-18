function Slider(props) {
    const { onChange, value, min, max } = props;
    const onValueChange = (event) => { 
        onChange(event.target.value)
    }
    return (
        <>
            <input 
                type="range" 
                min={min} 
                max={max} 
                value={value} 
                className="slider" 
                id="myRange"
                onChange={onValueChange}
            />
        </>
    )
}

export default Slider