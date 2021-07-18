import React from 'react';
import logo from './../images/Vector.svg';
import {Link, Route, Switch} from 'react-router-dom'

function Header () {
  return (
    <div className="header section section_size_narrow">
      <img src={logo} alt="логотип место Россия" className="logo" />
      <Switch>
        <Route path="/sing-up">
          <Link to="sing-in" className="header__link opacity"> Войти </Link>
        </Route>
        <Route path="/sing-in">
          <Link to="sing-up" className="header__link opacity"> Зарегистрироваться </Link>
        </Route>
        <Route path="/">
          <Link to="sing-in" className="header__link opacity"> Выйти </Link>
        </Route>
      </Switch>
    </div>
  )
};

export default Header;