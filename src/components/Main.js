import React from 'react';
import Card from './Card.js'
import avatarEdit from './../images/Vector_pen.svg';
import profileEdit from './../images/Vector_plus.svg';
import {CurrentUserContext} from './../contexts/CurrentUserContext.js'

function Main (props) {
  const currentUser = React.useContext(CurrentUserContext)


  return (
    <main className="content section section_size_wide">
      <section className="profile section section_size_wide">
        <div className="profile__info">
          <div className="profile__avatar">
            <button type="button" onClick = {props.onEditAvatar} className="profile__avatar-btn">
              <img src={currentUser.avatar} alt = "фото пользователя" className="profile__avatar-image"/>
            </button>
          </div>
          <article className="profile__texts">
            <div className="profile__rows">
              <h1 className="profile__title">{currentUser.name}</h1>
              <img src={avatarEdit} alt="иконка редактирования профиля" onClick = {props.onEditProfile} className="profile__edit-button opacity"/>
            </div>
            <h2 className="profile__subtitle">{currentUser.about}</h2>
          </article>
        </div>
        <img src={profileEdit} alt="добавить карточку" onClick = {props.onAddPlace} className="profile__button profile__button-card opacity"/>
      </section>
      <section className="cards section section_size_wide">
        {props.cards && props.cards.map((card) => {
          return (<Card key = {card._id} card = {card} onCardClick = {props.onCardClick} onCardLike = {props.onCardLike} onCardDelete = {props.onCardDelete}/>)
        })}
      </section>
    </main>
  )
}

export default Main