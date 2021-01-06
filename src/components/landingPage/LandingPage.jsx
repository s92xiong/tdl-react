import React from 'react';
import checkmark from "../../images/checkmark.png";

function LandingPage(props) {
  return (
    <div className="container-content">
      <div className="container-sign-in">
        <img src={checkmark} alt=""/>
        <h1>To Do</h1>
        <h3>A task management web-application inspired by Microsoft To Do.</h3>
        <button onClick={props.signInWithGoogle}>Sign in with Google</button>
      </div>
      <p><a href="https://github.com/s92xiong" target="blank">Github: s92xiong</a></p>
    </div>
  );
}

export default LandingPage;