import React, { useState } from 'react'
import { Form, Input, Icon, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { reauthenticate } from '../../utils/Api';
import alertError from '../../utils/AlertErrors';
import firebase from '../../utils/Firebase';
import 'firebase/auth';

export default function UserEmail(props) {
  const {user, setShowModal, setTitleModal, setContentModal, setReloadApp} = props;
  
  const onEdit = ()=>{
    setTitleModal('Editar Email');
    setContentModal(<ChangeEmailForm user={user} setReloadApp={setReloadApp} setShowModal={setShowModal}/>)
    setShowModal(true);

  }

  return (
    <div className='user-email'>
      <h3>{user.email}</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  )
}

function ChangeEmailForm(props){
  const {user, setReloadApp, setShowModal } = props
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({email: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async()=>{
    if(!formData.email){
      setShowModal(false);
    }else{
      setIsLoading(true);
      try {
        await reauthenticate(formData.password);
        const currentUser = firebase.auth().currentUser;
        await currentUser.updateEmail(formData.email);
        toast.success('Email editado correctamente');
        await currentUser.sendEmailVerification();
        firebase.auth().signOut();
                
      } catch (err) {
        alertError(err.code);
      } finally {
        setIsLoading(false);
      }
    }
  }
  return(
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input 
          onChange={e=>setFormData({...formData, email: e.target.value})} 
          defaultValue={user.email} 
          type='text'/>
      </Form.Field>
      <Form.Field>
        <Input 
          onChange={e=>setFormData({...formData, password: e.target.value})}
          placeholder='Contraseña' 
          type={showPassword ? 'text' :'password'} 
          icon={<Icon onClick={()=>setShowPassword(!showPassword)} 
          name={showPassword ? 'eye slash outline' :'eye'} 
          link />}/>
      </Form.Field>
      <Button type='submit' loading={isLoading}>
        Actualizar  Email
      </Button>
    </Form>
  )

}