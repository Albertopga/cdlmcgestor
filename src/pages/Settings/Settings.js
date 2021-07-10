import React, { useState } from 'react'
import UpdateAvatar from '../../components/Settings/UpdateAvatar';

import './style.scss'

export default function Settings(props) {
  const { user, setReloadApp } = props;

  return (
    <div className='settings'>
      <h1>Editar usuario</h1>
      <div className='avatar-name'>
        <UpdateAvatar user={user} setReloadApp={setReloadApp}/>        
      </div>
    </div>
  )
}
