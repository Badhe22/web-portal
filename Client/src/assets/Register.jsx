import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
    const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    // Register.jsx
    const handleRegister = (event) => {
        event.preventDefault();
    
        axios.post('http://localhost:3001/register', { firstName, lastName, email, password })
            .then(result => {
                console.log(result);
                const responseData = result.data;
    
                if (result.status === 200) {
                    // Registration successful
                    alert("Registered successfully! Please Login to proceed.");
                    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
                    const updatedUsers = [...storedUsers, { firstName, lastName, email, password }];
                    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
                    navigate('/login');
                } else if (result.status === 400 && responseData.message === "Email already registered") {
                    // Email already registered
                    alert("Email already registered! Please Login to proceed.");
                    navigate('/login');
                } else if (result.status === 400) {
                    // Handle other validation errors
                    alert("Registration failed. Please check your information and try again.");
                } else {
                    // Handle other cases if needed
                    alert("Registration failed. Please try again later.");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Registration failed. Please try again later.");
            });
    };
    

     
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >First Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter First Name"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >Last Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Last Name"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setLastName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit"  className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
