import React, { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import firebase from './utils/Firebase';
import 'firebase/auth';

import Auth from './pages/Auth/Auth';
import LoggedLayout from './Layouts/LoggedLayout/index';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

  firebase.auth().onAuthStateChanged(currentUser => {
    if(!currentUser?.emailVerified){
      firebase.auth().signOut();
      setUser(null);
    }else {
      setUser(currentUser)
    }
    setIsLoading(false)
  });


  if(isLoading) return null;

  return(
    <>
      {user ? <LoggedLayout user={user} setReloadApp={setReloadApp}/> : <Auth/>}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={true}
      >
      </ToastContainer>
    </>
  )
}

export default App;
