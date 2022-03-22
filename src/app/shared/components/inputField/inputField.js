import './style.css'

export function InputField(props) {
    const { placeholder, onChange, value, id, name, type } = props
    const onValueChange = (event) => { 
      onChange(event)
    }
    return(
      <div className="input-field">
        <input 
            id={id}
            name={name}
            className="go-full" 
            type={type}
            value={value}
            placeholder={placeholder} 
            onChange={onValueChange}
        />
      </div>
    )
}