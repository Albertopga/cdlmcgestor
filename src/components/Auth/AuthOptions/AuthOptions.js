import './style.scss'
import React from 'react'
import { Button } from 'semantic-ui-react'

export default function AuthOptions(props) {
  const {setSelectedForm} = props;

  return (
    <div className="auth-options">
      <h2>Registrate para accede a la aplicación</h2>
      <Button className="register" onClick={() => setSelectedForm('register')}>
        Registrate
      </Button>
      <Button className="login" onClick={() => setSelectedForm('login')}>
        Iniciar sesión
      </Button>

    </div>
  )
}
