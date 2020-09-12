import React, { useContext, useState } from 'react';
import './Login.css'
import * as firebase from "firebase/app";
import "firebase/auth";
import {UserContext} from "../../App"
import firebaseConfig from "./firebase.config"
import { useHistory, useLocation } from 'react-router';
firebase.initializeApp(firebaseConfig)
const Login = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn:false,
        name : '',
        email : '',
        photo : '',
        success : '',
        error : ''
    })

   const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    
  // Firebase Google Sign IN  
  const provider = new firebase.auth.GoogleAuthProvider()
  const googleSign = () =>{
      firebase.auth().signInWithPopup(provider)
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
    }
      // history and location
      let history = useHistory();
      let location = useLocation();

      let { from } = location.state || { from: { pathname: "/" } };

    // Firebase Email AUthentication
    const handleOnBlur = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        let isFormValid = true;
        if(name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(value)
        }if(name === 'password'){
            isFormValid = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)
        }if(isFormValid){
            const newUser = {...user}
            newUser[name] = value;
            setUser(newUser)
        }
    }
    // Handle Submit button

    const handleSubmit =(e) => {
        if(newUser && user.email && user.password){
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
    
    if(!newUser && user.email && user.password){
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
        e.preventDefault()
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
    return (
        <div className="login__area">

        <div  className="login__form">
      <h3>Authentication Form</h3>
      <hr/>
      
      <label htmlFor="user"><input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="user"/> create account</label>
      <div className="input__fields">
      {
        newUser &&  <input type="text" onBlur={handleOnBlur} placeholder="Enter your Name" name="name" required/>
      }
     
      <input type="text" style={{margin : '10px'}} onBlur={handleOnBlur} placeholder="Enter your email" name="email" required/>
      
      <input type="password"  onBlur={handleOnBlur} placeholder="Enter your password" name="password" required/>
      </div>
       <input type="submit" className="submit__btn" onClick={handleSubmit} value={newUser ? 'SIGN UP' : 'SIGN IN'}/> 
     
       </div>

      {
        user.success && <p style={{color: 'green'}}> {newUser ? 'Successfully Created account' : 'Successfully logged In '} </p> 
      }   
      {/* Google Button */}
      <button  className='google__sign' onClick={googleSign} ><i class="fab fa-google" ></i>Google Sign In</button>

      <img src={user.photo} alt=""/>
      <p style={{color: 'red'}}>{user.error}</p>
    

    </div>
    );
};

export default Login;