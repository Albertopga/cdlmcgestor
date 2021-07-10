import './style.scss'

import React, { useState } from 'react'
import AuthOptions from '../../components/Auth/AuthOptions'
import LoginForm from '../../components/Auth/LoginForm'
import RegisterForm from '../../components/Auth/RegisterForm'
import BackgroundAuth from '../../assets/jpg/background-auth.jpg'
import LogoIcon  from '../../assets/png/icon-logo-tag.png'
export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    const defaultForm = <AuthOptions setSelectedForm= {setSelectedForm} />
    const formOptions = {
      'login': <LoginForm setSelectedForm= {setSelectedForm}/>,
      'register': <RegisterForm AuthOptions setSelectedForm= {setSelectedForm}/>   
    }

    return formOptions[selectedForm] || defaultForm;
  }


  return (
    <div 
      className='auth' 
      style={{backgroundImage: `url(${BackgroundAuth})`}}
    >
      <div className="auth"/>
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoIcon} alt="gestor-CdlMc"/>
        </div>
        {handlerForm()}
      </div>
    </div>
  )
}
