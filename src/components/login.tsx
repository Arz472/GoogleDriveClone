import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/styles/login.css';

type User = {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [user, setUser] = useState<User>({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user);
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" id="email" name="email" placeholder="Enter email" value={user.email} onChange={handleInputChange} />
                <input type="text" id="password" name="password" placeholder="Enter password" value={user.password} onChange={handleInputChange} />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
}

export default Login;