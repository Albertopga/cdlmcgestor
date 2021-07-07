import './Auth.scss'

import React, { useState } from 'react'
import AuthOptions from '../../components/Auth/AuthOptions'
import LoginForm from '../../components/Auth/LoginForm'
import RegisterForm from '../../components/Auth/RegisterForm'
import BackgroundAuth from '../../assets/jpg/background-auth.jpg'
import LogoNameWhite  from '../../assets/png/logo-name-white.png'

export default function Auth() {
  const [selectedForm, setselectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case 'login':
        return <LoginForm/>
      case 'register':
        return <RegisterForm/>    
      default:
        return <AuthOptions/>;
    }
  }
  return (
    <div 
      className='auth' 
      style={{backgroundImage: `url(${BackgroundAuth})`}}
    >
      <div className="auth__dark"/>
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoNameWhite} alt="gestor-CdlMc"/>
        </div>
        {handlerForm()}
      </div>
    </div>
  )
}
