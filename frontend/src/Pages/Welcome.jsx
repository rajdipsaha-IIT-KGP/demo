import React from 'react';
import './Welcome.css';

function Welcome() {
  let userStr = localStorage.getItem('user')||sessionStorage.getItem('user')
 let user = null;
 try{
  user = JSON.parse(userStr)
 }
 catch(err){
user = null;
 }
  return (
    <div className="welcome-container">
      <h1>🎉 Welcome, {user?.fullname || 'User'}!</h1>
      <p>You have successfully signed in.</p>
    </div>
  );
}

export default Welcome;
