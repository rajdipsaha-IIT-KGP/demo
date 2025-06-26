import React from 'react';
import './Welcome.css';

function Welcome() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="welcome-container">
      <h1>🎉 Welcome, {user?.fullname || 'User'}!</h1>
      <p>You have successfully signed in.</p>
    </div>
  );
}

export default Welcome;
