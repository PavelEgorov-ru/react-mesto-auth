function PopupWithForm (props) {
  return(
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__overlay"></div>
      <form className={`popup__content popup__content_size-normal popup__content_${props.name}`} onSubmit = {props.onSubmit}>
        <div className={`popup__close-icon opacity popup__close-icon-${props.name}`} onClick = {props.onClose}>+</div>
        <h2 className="popup__title">{`${props.title}`}</h2>
           {props.children}
        <button type="submit" className="popup__button popup__button_margin-normal"> {props.button} </button>
      </form>
    </div>
  )
}

export default PopupWithForm