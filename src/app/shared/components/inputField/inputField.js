import './style.css'

function InputField(props) {
    const { placeholder, onChange } = props
    const onValueChange = (event) => { 
        onChange(event.target.value)
    }
    return(
      <>
        <input 
            className="go-full" 
            type="text" 
            placeholder={placeholder} 
            onChange={onValueChange}
        />
      </>
    )
}

export default InputField