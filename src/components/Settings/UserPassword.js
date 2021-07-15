import React, { useState } from 'react'
import { Button } from 'semantic-ui-react';
import { Form, Input, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { reauthenticate } from '../../utils/Api';
import alertError from '../../utils/AlertErrors';
import firebase from '../../utils/Firebase';
import 'firebase/auth';

export default function UserPassword(props) {
  const {setShowModal, setTitleModal, setContentModal, setReloadApp} = props;
  
  const onEdit = ()=>{
    setTitleModal('Editar Password');
    setContentModal(<ChangePasswordForm setReloadApp={setReloadApp} setShowModal={setShowModal}/>)
    setShowModal(true);

  }

  return (
    <div className='user-email'>
      <h3>Editar contraseña:</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  )
}

function ChangePasswordForm(props){
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({currentPassword: '', newPassword: '', repeatPassword: ''});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async()=>{
    if(!formData.currentPassword || !formData.newPassword ||!formData.repeatPassword  ){
      toast.warning('La contraseña no puede estar vacía');
    }else if(formData.currentPassword === formData.newPassword ){
      toast.warning('La contraseña no puede ser igual a la actual');
    }else if(formData.newPassword !== formData.repeatPassword ){
      toast.warning('Las contraseñas no coinciden');
    }else if(formData.newPassword.length < 6 ){
      toast.warning('Las contraseñas ha de tener 6 caracteres o más');
    }else {      
      setIsLoading(true);
      try {
        await reauthenticate(formData.currentPassword);
        const currentUser = firebase.auth().currentUser;
        await currentUser.updatePassword(formData.repeatPassword);
        toast.success('Password editada correctamente');        
                
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
          onChange={e=>setFormData({...formData, currentPassword: e.target.value})}
          placeholder='Contraseña actual' 
          type={showPassword ? 'text' :'password'} 
          icon={<Icon onClick={()=>setShowPassword(!showPassword)} 
          name={showPassword ? 'eye slash outline' :'eye'} 
          link />}/>
      </Form.Field>
      <Form.Field>
        <Input 
          onChange={e=>setFormData({...formData, newPassword: e.target.value})}
          placeholder='Nueva Contraseña' 
          type={showPassword ? 'text' :'password'} 
          icon={<Icon onClick={()=>setShowPassword(!showPassword)} 
          name={showPassword ? 'eye slash outline' :'eye'} 
          link />}/>
      </Form.Field>
      <Form.Field>
        <Input 
          onChange={e=>setFormData({...formData, repeatPassword: e.target.value})}
          placeholder='Repetir Contraseña' 
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
