import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as EyeIcon } from '../icons/eye.svg';
import { ReactComponent as EyeSlashIcon } from '../icons/eye_slash.svg';
import SetTheme from "./SetTheme";
import axios from "axios";

export default function AuthForm(props) {
  const { type } = props;
  const [isShown, setIsShown] = useState(false);
  function validateBase(id) {
    const string = document.getElementById(id);
    if (string.value.length > 0) {
      axios.post('http://127.0.0.1:5000/validate-input', {
        id: id,
        value: string.value
      })
      .then(function(response) {
        if (response.data['valid']) {
          string.className = 'input valid-input';
        }
        else {
          string.className = 'input invalid-input';
        }
      })
    }
    else {
      string.className = 'input';
    }
  }
  function validateUsername() {
    validateBase('username');
  }
  function validateEmail() {
    validateBase('email');
  }
  function validatePassword() {
    validateBase('password');
  }
  function submit() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (type === 'register') {
      const email = document.getElementById('email').value;
      if (username.length > 0 && email.length > 0 && password.length > 0) {
        axios.post('http://127.0.0.1:5000/register', {
          username: username,
          email: email,
          password: password
        })
        .then(function(response) {
          if (response.data['error']) {
            alert('Error: invalid ' + response.data['error']);
          }
          else if (response.data['success']) {
            alert('Success: ' + response.data['success']);
          }
        })
      }
    }
  }
  function togglePassword() {
    setIsShown(isShown => !isShown);
  }
  let emailBlock;
  let footerBlock;
  if (type === 'register') {
    emailBlock = (
      <div className="mt-3">
        <label htmlFor="email" className="w-100">Email</label>
        <input onInput={validateEmail} type="email" id="email" name="email" className="input" />
      </div>
    );
    footerBlock = (
      <div className="muted-color">
        Already have an account? <Link to={'/login'} className="link">Log in</Link>
      </div>
    );
  }
  else if (type === 'login') {
    emailBlock = ''
    footerBlock = (
      <div className="muted-color">
        Don't have an account? <Link to={'/register'} className="link">Sign up</Link>
      </div>
    );
  }
  return (
    <>
    <SetTheme />
    <div className="text-center my-4">
      <Link to={'/'}>
        <img src='/logo192.png' alt='logo' width={32} height={32} />
      </Link>
      <h5 className="mt-2 serif muted-color">FastAPI - React</h5>
    </div>
    <div className="card auth-form mx-auto p-3">
      <div>
        <label htmlFor="username" className="w-100">Username</label>
        <input onInput={validateUsername} type="text" id="username" name="username" className="input" maxLength={25} autoFocus />
        <div className="muted-color ms-3">
          <small>
            5-30; a-Z, 0-9, _
          </small>
        </div>
      </div>
      {emailBlock}
      <div className="password my-3">
        <label htmlFor="password" className="w-100">Password</label>
        <input onInput={validatePassword} type={isShown ? 'text' : 'password'} id="password" name="password" className="input" maxLength={60} autoComplete='off' />
        <div className="toggle d-flex justify-content-end">
          <button onClick={togglePassword} className="button icon-button">
            {isShown ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        </div>
        <div className="muted-color ms-3">
          <small>
            - 10-60<br></br>
            - a-Z, 0-9, punctuation<br></br>
            - one lowercase, one uppercase, one digit<br></br>
            - don't repeat the same character many times
          </small>
        </div>        
      </div>
      <button onClick={submit} className="button submit-button">{type === 'login' ? 'Log in' : 'Sign up'}</button>
    </div>
    <div className="text-center my-3">{footerBlock}</div>
    </>
  );
}