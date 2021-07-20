import React from 'react';
import logo from './../images/Vector.svg';
import {Link, Route, Switch} from 'react-router-dom'

function Header (props) {
  return (
    <div className="header section section_size_narrow">
      <img src={logo} alt="логотип место Россия" className="logo" />
      <Switch>
        <Route path="/sing-up">
          <div className="header__container">
            <div>{props.email}</div>
            <Link to="sing-in" className="header__link opacity"> Войти </Link>
          </div>
        </Route>
        <Route path="/sing-in">
          <div className="header__container">
            <div>{props.email}</div>
            <Link to="sing-up" className="header__link opacity"> Зарегистрироваться </Link>
          </div>
        </Route>
        <Route path="/">
          <div className="header__container">
            <div>{props.email}</div>
            <Link to="sing-in" className="header__link opacity" onClick = {props.onSignOut}> Выйти </Link>
          </div>
        </Route>
      </Switch>
    </div>
  )
};

export default Header;