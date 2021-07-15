import React, { useState, useCallback } from 'react'
import { Image } from 'semantic-ui-react'
import NoAvatar from '../../assets/png/user.png'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import firebase from '../../utils/Firebase';
import 'firebase/storage';
import 'firebase/auth';

export default function UpdateAvatar(props) {
  const { user, setReloadApp } = props;
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  const onDrop = useCallback(acceptedFiles =>{
    const file = acceptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file)
    .then( () =>{
      updateUserAvatar();
    })
  })

  const uploadImage = file =>{
    const ref = firebase.storage().ref().child(`avatars/${user.uid}`);
    return ref.put(file);

  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpeg',
    noKeyboard: true,
    onDrop   
  });

  const updateUserAvatar = ()  => {
    firebase.storage().ref(`avatars/${user.uid}`).getDownloadURL()
    .then(async res =>{
      await firebase.auth().currentUser.updateProfile({ photoURL: res});
      setReloadApp(prevState => !prevState);
    })
    .catch(()=>{
      toast.error('Error al actualizar el avatar');
    })
  }
  return (
    <div className='user-avatar' {...getRootProps()}>
      <input {...getInputProps()}/>
      <Image src={ avatarUrl ? avatarUrl : NoAvatar } />     
     
    </div>
  )
}
