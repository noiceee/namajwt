import React from 'react';
import { useRef, useState } from 'react';
import axios from 'axios';
import './login.scss';

export default function Login({setUser}) {

  const [errorText, setErrorText] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e){
    axios.post("/auth/login", {
      email: emailRef.current.value, 
      password: passwordRef.current.value
    }).then(res => {
      if(res.status == 200){
        localStorage.setItem("accessToken", res.data.accessToken);
        setUser(res.data);
      }
    }).catch(err => {
      setErrorText(err.response.data)
    });
    e.preventDefault();
  }

  return (
    <div className="login">
      <div className="container">
        <img src="https://nemesisconsultants.com/images/logo.png" alt="nemesis-logo" srcset="" />
        <div className="input-wrapper">
          <form onSubmit={handleSubmit}>
            <input type="email" name="emailid" id='emailInput' placeholder='Email' ref={emailRef}/>
            <input type="password" name="password" id='passwordInput' placeholder='Password' ref={passwordRef}/>
            <p>{errorText || <br/>}</p>
            <button type="submit">LOGIN</button>
          </form>
        </div>
      </div>
    </div>);
}
