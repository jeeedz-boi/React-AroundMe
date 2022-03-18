import './style.css'

export function InputField(props) {
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