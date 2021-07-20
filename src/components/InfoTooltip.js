import img from './../images/true.png'
import img1 from './../images/-false.png'

function InfoTooltip (props) {
  return(
    <div className={`popup popup__info ${props.isOpen ? 'popup_visible' : ''}`}>
      <div className="popup__overlay"></div>
      <div className="popup__content popup__content_size-min popup__content_center">
        <img className = "popup__img" src = {`${props.flag ? img1 : img}`} alt = "#"/>
        <div className="popup__close-icon opacity" onClick = {props.onClose} >+</div>
        <h2 className="popup__subtitle">{`${props.flag ? "Вы успешно зарегистрировались!" : "Что-то пошло не так. Попробуйте еще!" }`}</h2>         
      </div>
    </div>
  )
}

export default InfoTooltip