import React, { useState } from 'react';

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
        <form onSubmit={handleSubmit}>
            <input type="email" id="email"  placeholder="Enter email" value={user.email} onChange={handleInputChange} />
            <input type="password" id="password" placeholder="Enter password" value={user.password} onChange={handleInputChange} />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;