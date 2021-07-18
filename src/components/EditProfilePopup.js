import React from 'react'
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from './../contexts/CurrentUserContext.js'

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [description, setDescription ] = React.useState('')

  React.useEffect(() => {
    setName(currentUser ? currentUser.name : '');
    setDescription(currentUser ? currentUser.about : '');
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName (e) {
    setName(e.target.value)
  }

  function handleChangeDescription (e) {
    setDescription(e.target.value)
  }

  

  return (
    <PopupWithForm isOpen = {props.isOpen} onClose = {props.onClose} onSubmit = {handleSubmit} name = 'profile' title = 'Редактировать профиль' 
    button = 'Сохранить'>
      <div className="popup__item-container">
        <input type="text"  className="popup__item popup__item_el_name"  placeholder="имя" 
        id="input-name" minLength ="2" maxLength = "40" required onChange = {handleChangeName} value = {name || ''} />
        <span className="popup__error-input" id="input-name--error"></span>
      </div>
      <div className="popup__item-container">
        <input type="text"  className="popup__item popup__item_el_comment"  placeholder="о себе" 
        id="input-comment" minLength ="2" maxLength = "200" required onChange = {handleChangeDescription} value = {description ||  ''} />
        <span className="popup__error-input" id="input-comment--error"></span>
      </div>
    </PopupWithForm>
  )

}

export default EditProfilePopup