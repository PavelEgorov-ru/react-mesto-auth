import React from 'react'
import PopupWithForm from './PopupWithForm.js'


function EditAvatarPopup (props) {
  const avatarRef = React.useRef()
  

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(
      {avatar: avatarRef.current.value}
    );
  }


  return (
    <PopupWithForm isOpen = {props.isOpen} onClose = {props.onClose} onSubmit = {handleSubmit} name = 'avatar' title = 'Изменить фотографию'
      button = 'Сохранить'>
        <div className="popup__item-container">
          <input type="url" name="avatar" className="popup__item popup__item_el_link" id="input-avatar" ref = {avatarRef} placeholder="ссылка на картинку" required />
          <span className="popup__error-input" id="input-avatar--error"></span>
        </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup