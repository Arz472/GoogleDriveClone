import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";

const Signup: React.FC<{}> = () => {
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [error, setError] = useState<string | null>(null);
const { signUp } = useUserAuth();
const navigate = useNavigate();

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
        setEmail(e.target.value);
    } else {
        setPassword(e.target.value);
    }};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        await signUp(email, password)
        navigate("/");
         } catch (error) {
        setError(error.message);
    }};

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter email" 
                onChange={handleInputChange} />

                <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter password"  
                onChange={handleInputChange} />

                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/">Login</Link></p>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Signup;
