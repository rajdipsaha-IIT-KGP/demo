import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe,setrememberMe] = useState(false)
  let navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

 const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const response = await axios.post('https://demo-2-q8t9.onrender.com/signin', {
        fullname: name,
        email,
        password,
      });

      const msg = response.data.message;
      if (msg === "User signed in successfully") {
        toast.success(`Welcome ${response.data.user.fullname} 🎉`);
        if(rememberMe){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user',JSON.stringify(response.data.user))
      }
      else{
         localStorage.setItem('token', response.data.token);
        localStorage.setItem('user',JSON.stringify(response.data.user))
      }
        setEmail('');
        setName('');
        setPassword('');
        navigate('/welcome')
      }
      else if(msg === "Invalid name"){
toast.error("Invalid Password");
      }
      else if (msg === "Invalid password") {
        toast.error("Invalid Password");
      } else {
        toast.error(msg);
      }
    } catch (error) {
      console.error("Error during Signin:", error);
      toast.error(error.response?.data?.message || "An error occurred during Signin");
    }
  };

  return (
    <div className="Signin-container">
      <h1 className="Signin-title">Sign In</h1>
      <form onSubmit={handleSignin}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            autoComplete="off"
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
            autoComplete="off"
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
              autoComplete="off"
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
  <input
    type="checkbox"
    id="rememberMe"
    checked={rememberMe}
    onChange={(e) => setrememberMe(e.target.checked)}
  />
  <label htmlFor="rememberMe"> Remember me for 1 month</label>
</div>
        <button type="submit" className="Signin-button">Sign In</button>

        <div className="signin-redirect">
          <span>Don't have an account?</span>
          <span className="signin-link" onClick={() => navigate('/signup')}>Create One</span>
        </div>
   
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Signin;
