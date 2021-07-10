import './style.scss';
import React, { useState } from 'react';
import {Button, Icon, Form, Input} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import firebase from '../../../utils/Firebase';
import {validateEmail} from '../../../utils/Validations';
import 'firebase/auth';

export default function LoginForm(props) {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const onSubmit = () => {
    setFormError({})
    let errors = {};
    let formOk = true;

    if(!validateEmail(formData.email)){
      errors.email = true;
      formOk = false;
    }

    if(formData.password.length < 6) {
      errors.password = true;
      formOk = false
    }
    setFormError(errors);
    
    if(formOk){
      setIsLoading(true);
      firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
      .then( res =>{
        setUser(res.user);
        setUserActive(res.user.emailVerified);
        if(!res.user.emailVerified){
          toast.warning('Para poder acceder, primero has de verificar tu emial');
        }
      })
      .catch( err => {
        handlerErrors(err.code)
      })
      .finally( ()=>{
        setIsLoading(false);
      })
    }
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleShowPassword = () =>{
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-form">
      <h1>LoginForm...</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
            error={formError.email}           
          />
          { formError.email &&(<span className='errt-text'> Introduce un correo válido</span>) }
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            icon={
              showPassword 
                ? (<Icon name="eye slash outline" link onClick={handleShowPassword}/>)
                : (<Icon name="eye" link onClick={handleShowPassword}/>)
            }
            error={formError.password}           
          />
          { formError.password &&(<span className='errt-text'> La contraseña ha de tener mas de 5 caracteres</span>) }
        </Form.Field>
        <Button type="submit" loading={isLoading}>Continuar</Button>
      </Form>
      {!userActive && 
        (<ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setUserActive={setUserActive}
        />)
      }
      <div className='login-form__options'>
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>¿No tienes cuenta? <span onClick={()=> setSelectedForm('register')}>Regístrate</span></p>
      </div>
    </div>
  )
}

const defaultValueForm = ()=>{
  return {
    email: '',
    password: ''
  }
}

function ButtonResetSendEmailVerification(props){
  const { user, setIsLoading, setUserActive } = props;

  const resendVerificationEmail = ()=>{
    user.sendEmailVerification()
    .then(()=>{
      toast.success('Email de verificación enviado');
    })
    .catch( err =>{
      handlerErrors(err.code)
    })
    .finally(()=>{
      setIsLoading(false);
      setUserActive(true);
    })
  }
  return(
    <div className="resend-verification-email">
      <p>Si no has recibido el email de verificación, puedes solicitarlo <span onClick={resendVerificationEmail}> aquí</span></p>
    </div>
  )
}

function handlerErrors(code) {
  const errorCodes ={
    'auth/user-not-found': 'El usuario indicado no existe.',
    'auth/wrong-password': 'Contraseña inconrrecta.',
    'auth/too-manu-request': 'Se han solicitado demasiadas peticiones de reenvio de email de confirmación. Espere unos minutos.'
  }

  toast.warning(errorCodes[code] || 'Algo ha fallado' );
}