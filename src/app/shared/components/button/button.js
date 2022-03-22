import './style.css'
export function Button(props) {
  const { onClick, text, imageSource } = props
    return(
      <div className="button-main">
          <button 
            className="go-full"
            type="button"
            onClick={onClick}
          >
            {text}
            <img
              className="button-image"
              onClick={onClick}
              src={imageSource}
              alt=''
          />
          </button>
      </div>
    )
}