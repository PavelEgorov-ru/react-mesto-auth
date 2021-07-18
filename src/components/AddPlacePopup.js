import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup (props) {

  const [name, setName] = React.useState()
  const [link, setLink ] = React.useState()

  function handleSubmit (e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
    setName('')
    setLink('')
  }

  function handleChangeName (e) {
    setName(e.target.value)
  }

  function handleChangeLink (e) {
    setLink(e.target.value)
  }

  return (
    <PopupWithForm isOpen = {props.isOpen} onClose = {props.onClose} onSubmit = {handleSubmit} name = 'card' title = 'Новое место'
    button = 'Сохранить'>
      <div className="popup__item-container">
        <input type="text" name="name" className="popup__item popup__item_el_place" onChange = {handleChangeName} value = {name || ''} placeholder="название" id="input-place" minLength ="2" maxLength = "30" required/>
        <span className="popup__error-input" id="input-place--error"></span>
      </div>        
      <div className="popup__item-container">
        <input type="url" name="link" className="popup__item popup__item_el_link" onChange = {handleChangeLink} value = {link || ''} id="input-link"  placeholder="ссылка на картинку" required/>
        <span className="popup__error-input" id="input-link--error"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup