/* eslint-disable prettier/prettier */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import './styles/LoginManager.css';

// local state variables to set username and password for login and sending fetch request for authentication
const LoginManager = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // handle invalid login
  const errorSpan = <span>Please use valid username or password</span>;

  // console.log is just a fun gimick for interal purposes
  const handleClick = () => {
    console.log(
      '%cLogin Initiated!',
      'font-weight: bold; font-size: 53px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38), 6px 6px 0 rgb(226,91,14), 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)',
    );

    fetch('http://localhost:3000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);

      })
      .catch(err => {
        console.log(err);
        setError('Username or Password not found in our database');
      });
  }

  // rendering username, password fields and login button
  return (
    <div id="login-container" className="loginManager">
      <div className="Login-Manager">
        {/* <span id="signin-title">Enter Login Information</span> */}
        <div id="User-Name">
          Username:
          <input
            name="username"
            className="user"
            type="text"
            onChange={() => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div id="Pass-word">
          Password:
          <input
            name="password"
            className="Password"
            type="password"
            onChange={() => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {error ? errorSpan : null}
        <button type="submit" className="Loginbutton" onClick={handleClick}>
          Log In
      </button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default LoginManager;

