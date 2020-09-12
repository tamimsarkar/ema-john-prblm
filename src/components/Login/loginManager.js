// For now this page is optional


import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"

export const initializeLogin = () => {
    firebase.initializeApp(firebaseConfig)
}

export const googleSign = () =>{
    
  const googleProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
          const {displayName,photoURL,email} = res.user;
          const signedIn = {
              isSignedIn : true,
              name : displayName,
             email : email,
             photo : photoURL 
          }
          setUser(signedIn)
      })
      .catch(error =>{
        console.log(error)
      })
  }

  export const createUserWithEmailAndPassword = () => {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res => {
      const newUserInfo = {...user}
      newUserInfo.success = true;
      newUserInfo.error = '';
      setUser(newUserInfo);
      
      updateUserName(user.name)
    })
    .catch((error) => {
      const newUserInfo = {...user}
      newUserInfo.error = error.message
      newUserInfo.success = false
      setUser(newUserInfo);
    });
  }

  export const signInWithEmailAndPassword = () => {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then( res => {
      const newUserInfo = {...user}
      newUserInfo.success = true;
      newUserInfo.error = '';
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      history.replace(from);
      console.log(res.user,'sign in success')
    })
    .catch(function(error) {
      // Handle Errors here.
      const newUserInfo = {...user}
      newUserInfo.error = error.message
      newUserInfo.success = false
      setUser(newUserInfo);
      // ...
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName : name
    }).then(function() {
      // Update successful.
        console.log('user photo updated')
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });    

  }