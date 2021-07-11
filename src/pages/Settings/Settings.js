import React, { useState } from 'react'
import UpdateAvatar from '../../components/Settings/UpdateAvatar';
import UserName from '../../components/Settings/UserName';
import BasicModal from '../../components/Modals/BasicModal';

import './style.scss'

export default function Settings(props) {
  const { user, setReloadApp } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [contentModal, setContentModal] = useState(null);
  return (
    <div className='settings'>
      <h1>Editar usuario</h1>
      <div className='avatar-name'>
        <UpdateAvatar user={user} setReloadApp={setReloadApp}/>
        <UserName user={user} setShowModal={setShowModal} setTitleModal={setTitleModal} setContentModal={setContentModal} setReloadApp={setReloadApp}/>
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size='tiny'>
        {contentModal}
      </BasicModal>
    </div>
  )
}
