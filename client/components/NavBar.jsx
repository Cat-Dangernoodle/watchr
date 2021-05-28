import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './styles/NavBar.css';
const NavBar = (props) => {

  const logOut = () => {
    props.setState({ loggedIn: true, current: 'login' });
  }

  return (
    <div class="bar">
      <ul class="links">
        <Link to="/login">Log In</Link>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Link to="/signup">Sign Up</Link>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <Link to="/home">Home</Link>
      </ul>
    </div>
  )
};

export default NavBar;