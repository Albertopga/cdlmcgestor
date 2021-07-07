import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCRdqWbpJLCUdVoaaTgYQnDdGqi9gioIW8",
  authDomain: "gestorcdlmc.firebaseapp.com",
  projectId: "gestorcdlmc",
  storageBucket: "gestorcdlmc.appspot.com",
  messagingSenderId: "1014869904556",
  appId: "1:1014869904556:web:e078511d81365a40642309"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);