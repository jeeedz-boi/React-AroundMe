import './style.css'

export function RoundedButton(props) {
  const { onClick, isActive, imageSource, small} = props
    return(
      <div className={small ? "rounded-light-button" :"rounded-button"}>
        <img
            className={isActive ? "image-down" : "image-up"}
            onClick={onClick}
            src={imageSource}
            alt=''
        />
      </div>
    )
}