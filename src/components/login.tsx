import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/styles/login.css'; 
import { useUserAuth } from "../context/UserAuthContext"; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { logIn } = useUserAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        try {
            await logIn(email, password);
            navigate("/user");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Log In</h2>
                <input type="email" id="email" name="email" placeholder="Enter email" onChange={handleInputChange} />
                <input type="password" id="password" name="password" placeholder="Enter password" onChange={handleInputChange} />
                <button type="submit">Log In</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
