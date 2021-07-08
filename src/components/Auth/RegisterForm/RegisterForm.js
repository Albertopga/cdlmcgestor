import './style.scss';
import React, { useState } from 'react';
import {Button, Icon, Form, Input} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import firebase from '../../../utils/Firebase';
import {validateEmail} from '../../../utils/Validations';
import 'firebase/auth';

export default function RegisterForm(props) {
  const { setSelectedForm } = props
  const [formData, setformData] = useState(defaultValueForm)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const onChange = e => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const onSubmit = ()=> {
    setFormError({});
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

    if(!formData.username) {
      errors.username = true;
      formOk = false;
    }

    setFormError(errors);

    if(formOk) {
      setIsLoading(true);
      firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
      .then(() =>{
        toast.success("Cuentra creada")
        changeUserName()
        sendVerificationEmail()
      })
      .catch(()=>{
        toast.error("Error al crear la cuenta")
      })
      .finally(()=>{
        setIsLoading(false)
        setSelectedForm(null)
      });
    }
  }
  const changeUserName = ()=> {
    firebase.auth().currentUser.updateProfile({
      displayName: formData.username
    })
    .catch(()=>{
      toast.error('Error al asignar el nombre de usuario');
    })
  }
  
  const sendVerificationEmail = ()=>{
    firebase.auth().currentUser.sendEmailVerification()
    .then(()=>{
      toast.success('Email de verificación enviado correctamente');
    })
    .catch(()=>{
      toast.error('Error al enviar email de verificación');
    })
  }

  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }

  return (
    <div className="register-form">
      <h1>Introduce tus datos para registrate</h1>
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
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="Usuario"
            icon="user circle outline"
            error={formError.username}           
          />
          { formError.username &&(<span className='errt-text'> Introduzca un nombre</span>) }
        </Form.Field>
        <Button type="submit" loading={isLoading}>Continuar</Button>
      </Form>
      <div className="register-form__options">
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p onClick={() => setSelectedForm('login')}>¿Ya estás registrado <span>Iniciar Sesión</span>
        </p>
      </div>
    </div>
  )
}

function defaultValueForm(){
  return{
    email: '',
    password: '',
    username: ''
  }
}