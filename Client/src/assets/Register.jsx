// Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register({ onRegister }) {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/register", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log(result);
      

      onRegister({ firstName, lastName, email, password });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <center>Sign Up</center>
        </h2>

        <form >
          <div className="col-md-12">
            <label htmlFor="firstname">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              autoComplete="off"
              name="firstname"
              className="form-control rounded-0"
              onChange={(e) => setFirstName(e.target.value)}
            />
            
            <label htmlFor="lastname">
                        <strong>Last Name</strong>
                    </label>
                    <input type="text" 
                    placeholder='Enter Last Name' 
                    autoComplete='off' 
                    name='lastname' 
                    className='form-control rounded-0'
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="text" 
                    placeholder='name@gmail.com' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                
          </div>

          <button type="submit"onClick={handleRegister} className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
        <p>Already have an account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
        
      </div>
    </div>
  );
}

export default Register;
