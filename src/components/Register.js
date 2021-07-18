import React from 'react';
import {withRouter} from 'react-router-dom'

function Register (props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangeEmail(e) {
    // const {name, value} = e.target
    // setEmail({[name]: value})
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    // const {name, value} = e.target
    // setPassword({[name] : value})
    setPassword(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.onRegister(email, password)
  }

  return ( 
    <div className = "sing section section_size_narrow" >
      <form className = "sing__content section section_size_wide" onSubmit={handleSubmit}>
        <h2 className = "sing__title">Регистрация</h2>
        <div className = "sing__item-container">
          <input className = "sing__item" placeholder = "Email" name = "email" type="email" required onChange={handleChangeEmail}/>
          <span className = "sing__error-input"></span>
        </div>
        <div className = "sing__item-container">
          <input className = "sing__item" placeholder = "Пароль" name = "password" type = "password" required onChange={handleChangePassword} value = {password || ''}/>
          <span className = "sing__error-input"></span>
        </div>
        <button type = "submit" className ="sing__button opacity">Зарегистрироваться</button>
        <div className = "sing__text">Уже зарегестрированы? <a className ="sing__text-link opacity" href = "#">Войти</a></div>
      </form>
    </div>
  )
}

export default withRouter (Register)