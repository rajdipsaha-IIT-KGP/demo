import React, { useState } from 'react';
import './Signup.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!name || !email || !password || !confirm) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        fullname: name,
        email,
        password
      });

      if (response.data.message === "User created successfully") {
        toast.success("User created successfully 🎉");
        localStorage.setItem('token', response.data.token);
        setName('');
        setEmail('');
        setPassword('');
        setConfirm('');
      } else {
        toast.error(response.data.message || "Error creating user");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "An error occurred during signup");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPassword(prev => !prev)}
            ></i>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              className="form-control"
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <i
              className={`fas ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowConfirm(prev => !prev)}
            ></i>
          </div>
        </div>

        <button type="submit" className="signup-button" onClick={handleSignUp}>Register</button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button type="button" className="google-button">
          <i className="fab fa-google"></i> Sign up with Google
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Signup;
