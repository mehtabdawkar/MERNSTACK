// Updated Login.js with a visually appealing interface
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [orderId, setOrderId] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
      // Function to validate email
      const isValidEmail = (email) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
      };
  
      // Function to validate password
      const isValidPassword = (password) => {
          // Example: Password should be at least 8 characters long and contain a mix of letters and numbers
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          return passwordRegex.test(password);
      };
  
      if (!isValidEmail(email)) {
          alert("Invalid Email");
          return; // Exit the function if the email is invalid
      }
  
      if (!isValidPassword(password)) {
          alert("Invalid Password. Password must be at least 8 characters long and include letters and numbers.");
          return; // Exit the function if the password is invalid
      }
  
      try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password, orderId }),
          });
  
          if (response.ok) {
            const data = await response.json();
            const query = orderId 
                ? `?orderId=${orderId}` 
                : '';
            navigate(`/orders${query}`, { state: { email: data.email } });
        } else {
            alert('Login failed');
        }
      } catch (error) {
          console.error("Error during login:", error);
          alert("An error occurred. Please try again.");
      }
  };
  
    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back!</h2>
                <p className="login-subtitle">Please log in to access your orders</p>
                <div className="login-form">
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Email or Phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Order ID (Optional)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                    <button className="login-button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
