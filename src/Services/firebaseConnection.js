import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC_uK2DOrMGfMMYrqiv50vg6Wyk2JYte2k",
    authDomain: "cbs-react.firebaseapp.com",
    projectId: "cbs-react",
    storageBucket: "cbs-react.appspot.com",
    messagingSenderId: "7768924256",
    appId: "1:7768924256:web:b08d2cd33df25a13bc2305",
    measurementId: "G-FRJN4S0ZNJ"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  

  export default firebase