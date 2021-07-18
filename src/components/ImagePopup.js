function ImagePopup(props) {
  return (
    <div className={`popup popup_add-image ${props.card.link ? 'popup_visible' : ''}`}>
      <div className="popup__overlay">
        <figure className="popup__figure ">
          <div className="popup__close-icon opacity popup__close-icon-add" onClick = {props.onClose}>+</div>
          <img src={props.card.link} alt = {props.card.name} className="popup__image" />
          <figcaption className="popup__figcaption"> {props.card.name} </figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup