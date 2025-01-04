import React, { useState } from 'react';
import './Settings.css'

const Settings = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Username:', username);
        console.log('Email:', email);
    };

    return (
        <div>
            <h2>Settings</h2>
            <p>Update your account details and preferences here.</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </label>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default Settings;
