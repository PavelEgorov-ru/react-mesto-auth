import React from 'react';
import {withRouter} from 'react-router-dom'

function Login (props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.onLogin(email, password)
  }

  return ( 
    <div className = "sing section section_size_narrow" >
      <form className = "sing__content section section_size_wide" onSubmit={handleSubmit}>
        <h2 className = "sing__title">Вход</h2>
        <div className = "sing__item-container">
          <input className = "sing__item" placeholder = "Email" type = "email" name="email" required onChange={handleChangeEmail}/>
          <span className = "sing__error-input"></span>
        </div>
        <div className = "sing__item-container">
          <input className = "sing__item" placeholder = "Пароль" type = "password" name="password" required onChange={handleChangePassword}/>
          <span className = "sing__error-input"></span>
        </div>
        <button type = "submit" className ="sing__button opacity">Войти</button>
      </form>
    </div>
  )
}

export default withRouter (Login)