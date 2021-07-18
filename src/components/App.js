// корневой компонент
import React from 'react';
import * as auth from './../auth.js'
import Header from './Header.js';
import Main from './Main.js';
import AddPlacePopup from './AddPlacePopup.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import {CurrentUserContext} from './../contexts/CurrentUserContext.js'
import newApi from './../utils/api.js'
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js'
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)

  const [selectCard, setSelectCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  const [loggedIn, setLoggedIn] = React.useState(false)

  const history = useHistory()
  

  React.useEffect(() => {
    newApi.getCards()
    .then((cardData) => {
      setCards(cardData)
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    newApi.like(card._id, isLiked)
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleCardDelete (card) {
    newApi.deleteCard(card._id)
    .then((newCard) => 
      setCards((cards) => cards.filter((c) => c._id !== card._id ))    
    )
    .catch((error) => {
      console.log(error)
    })
  }

  function handleAddPlaceSubmit (card) {
    newApi.setNewCard(card)
    .then ((newCard) => {
      setCards([newCard, ...cards])
      setIsAddPlacePopupOpen(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleRegisterSubmit (email, password) {
    auth.register(email, password)
    .then((data) => {
      if(data) {
        history.push('/sing-in')
    } else {
      console.log('получилась фигня')}
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleLoginSubmit (email, password) {
    auth.authorization(email, password)
    .then((data) => {
      if(data) {
        setLoggedIn(true)
        history.push('/')
    } else {
      console.log('получилась фигня')}
    })
    .catch((error) => {
      console.log(error)
    })
  }



  function handleUpdateUser (user) {
    newApi.editUserInfo(user)
    .then((userData) => {
      setCurrentUser(userData)
      setIsEditProfilePopupOpen(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleUpdateAvatar (avatar) {
    newApi.editAvatar(avatar)
    .then((userData) => {
      setCurrentUser(userData)
      setIsEditAvatarPopupOpen(false)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  React.useEffect(() => {
    newApi.newUserInfo()
    .then((userData) => {
      setCurrentUser(userData)
    })
    .catch((error) => {
       console.log(error)
    })
  }, [])

  const handleCardClick = (card) => {
    setSelectCard(card)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectCard({})
  }



  return (
    < div className="page__container">
    <CurrentUserContext.Provider value = {currentUser}>
      <Header/>
        <Switch>
          <ProtectedRoute path="/main" loggedIn = {loggedIn} component = {Main} onEditProfile = {handleEditProfileClick}
           onEditProfile = {handleEditProfileClick} onEditAvatar = {handleEditAvatarClick} onCardClick = {handleCardClick} 
           cards = {cards} onCardLike = {handleCardLike} onCardDelete = {handleCardDelete}/>            
          <Route path = "/sing-up">               
            <Register onRegister={handleRegisterSubmit}/>                
          </Route>
          <Route path = "/sing-in">                
            <Login onLogin={handleLoginSubmit}/>
          </Route>
          <Route path = "/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sing-in" />}
          </Route>
        </Switch>
      <Footer/>
      <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser}/>
      <EditAvatarPopup isOpen = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} />
      <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit} />
      <ImagePopup card = {selectCard} onClose = {closeAllPopups} /> 
    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
