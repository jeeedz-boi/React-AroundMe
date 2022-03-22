import './style.css'
export function Button(props) {
  const { onClick, text, imageSource, isBulk, type } = props
    return(
      <div className="button-main">
          <button 
            className={isBulk ? "go-full-and-bulk" : "go-full"}
            type={type}
            onClick={onClick}
          >
            <span>{text}</span>
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