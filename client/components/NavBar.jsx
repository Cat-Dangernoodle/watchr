import React from 'react';

// currently work in progress - to implement a navbar
const NavBar = (props) => {

  const logOut = () => {
    props.setState({ loggedIn: true, current: 'login' });
  }

  return (
    <div id="navbar" >
      <span onClick={() => props.setState({ current: 'home' })}>Home</span>
      <span onClick={logOut}>Log Out</span>
    </div>
  )
};

export default NavBar;