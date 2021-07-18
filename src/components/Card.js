import React from 'react';
import backet from './../images/Group2.png'
import {CurrentUserContext} from './../contexts/CurrentUserContext.js'

 function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id
  const isLiked = props.card.likes.some(i => i._id === currentUser._id)

  const cardDeleteButtonClassName = (
    ` ${isOwn ? 'cards__delete-icon opacity' : 'cards__delete-icon opacity visibility'}`
  )

  const cardLikeButtonClassName = (
    `${isLiked ? 'cards__button-like opacity cards__button-like-active' : 'cards__button-like opacity'}`
  )
  
  function handleClickCard () {
    props.onCardClick(props.card)
  }

  function  handleLikeClick () {
    props.onCardLike(props.card)
  }

  function handleBacketClick () {
    props.onCardDelete(props.card)
  }

  return (
  <article className="cards__element">
    <img src={backet} alt="кнопка удалить" className = {`${cardDeleteButtonClassName}`} onClick = {handleBacketClick} />
    <img className="cards__image" src = {props.card.link}  alt = {props.card.name} onClick = {handleClickCard}/>
    <div className="cards__content">
      <p className="cards__text"> {props.card.name} </p>
      <div className="cards__block-like">
        <div className={`${cardLikeButtonClassName}`} onClick = {handleLikeClick}/>
        <p className="cards__number-like"> {props.card.likes.length} </p>
      </div>          
    </div>         
  </article>
  )
   
}

export default Card