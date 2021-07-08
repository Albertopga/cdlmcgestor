import React, { useState } from 'react';
import firebase from './utils/Firebase';
import 'firebase/auth';
import Auth from './pages/Auth/Auth';
import {ToastContainer} from 'react-toastify';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  firebase.auth().onAuthStateChanged(currentUser => {
    console.log(currentUser)
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
      {user ? <UserLogged/> : <Auth/>}
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

function UserLogged() {
  const loguot = () => {
    firebase.auth().signOut();
  }

  return (
    <div 
      style= {{
        display: "flex",
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "column", 
        height: "100vh"}}
    >
      <h1>Usuario Logeado</h1>   
      <button onClick={loguot}>Cerrar Sesión</button>
    </div>
  )
}
export default App;
