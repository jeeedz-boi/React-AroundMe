import './style.css'

export function InputField(props) {
    const { placeholder, onChange, value } = props
    const onValueChange = (event) => { 
        onChange(event.target.value)
    }
    return(
      <div className="input-field">
        <input 
            className="go-full" 
            type="text" 
            value={value}
            placeholder={placeholder} 
            onChange={onValueChange}
        />
      </div>
    )
}