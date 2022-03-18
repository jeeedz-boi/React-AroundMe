import './style.css'
export function Button(props) {
  const { onClick, text } = props
    return(
      <>
        <button 
          className="go-small"
          type="button"
          onClick={onClick}
        >{text}</button>
      </>
    )
}