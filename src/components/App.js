// корневой компонент
import React from "react";
import * as auth from "../utils/auth.js";
import Header from "./Header.js";
import Main from "./Main.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import InfoTooltip from "./InfoTooltip.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";
import newApi from "./../utils/api.js";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);

  const [selectCard, setSelectCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState("");
  const [flag, setFlag] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      Promise.all([newApi.getCards(), newApi.getUserInfo()])
        .then(([cardData, userData]) => {
          setCards(cardData);
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    newApi
      .like(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    newApi
      .deleteCard(card._id)
      .then((newCard) =>
        setCards((cards) => cards.filter((c) => c._id !== card._id))
      )
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(card) {
    newApi
      .setNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setFlag(true);
        setIsInfoOpen(true);
        history.push("/sing-in");
      })
      .catch((error) => {
        setFlag(false);
        setIsInfoOpen(true);
        console.log(error);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .authorization(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        history.push("/");
        setUserEmail(email);
      })
      .catch((error) => {
        setFlag(false);
        setIsInfoOpen(true);
        console.log(error);
      });
  }

  function checkToken() {
    setIsLoading(true);
    if (localStorage.getItem("jwt")) {
      setIsLoading(true);
      const jwt = localStorage.getItem("jwt");
      auth
        .getContent(jwt)
        .then((data) => {
          setLoggedIn(true);
          setUserEmail(data.data.email);
          history.push("/");
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }

  function handleSignOut(e) {
    localStorage.removeItem("jwt");
    setUserEmail("");
  }

  function handleUpdateUser(user) {
    newApi
      .editUserInfo(user)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(avatar) {
    newApi
      .editAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCardClick = (card) => {
    setSelectCard(card);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoOpen(false);
    setSelectCard({});
  }

  return isLoading ? (
    <div className="page__container" />
  ) : (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onAddPlace={handleAddPlaceClick}
          />
          <Route path="/sing-up">
            <Register onRegister={handleRegisterSubmit} />
          </Route>
          <Route path="/sing-in">
            {!isLoading && <Login onLogin={handleLoginSubmit} />}
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sing-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoOpen} onClose={closeAllPopups} flag={flag} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
