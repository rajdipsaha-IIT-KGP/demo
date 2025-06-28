import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Signup.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,setLoading] = useState(false)
let navigate = useNavigate()
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!name || !email || !password || !confirm) {
      toast.error("All fields are required");
      return;
    }

   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
setLoading(true)
    try {
      const response = await axios.post('https://demo-2-q8t9.onrender.com/signup', {
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
    finally{
      setLoading(false)
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

        <button type="submit" className="signup-button" onClick={handleSignUp} disabled={loading}>
  {loading ? (
    <div style={{ width: '70px', height: '70px' }}>
      <DotLottieReact
        src="https://lottie.host/fae1307f-3cd4-4205-af77-c8a65d977497/l8A03soTO7.lottie"
        loop
        autoplay
      />
    </div>
  ) : (
    "Register"
  )}
</button>


        
  
       <div className="signin-redirect">
  <span>Already have an account?</span>
  <span className="signin-link" onClick={() => navigate('/signin')}>Sign in</span>
</div>

      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Signup;
