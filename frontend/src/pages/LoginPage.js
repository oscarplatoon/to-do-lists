import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../contexts/UserContext";

const Login = ({ isLoggedIn, handleLogout, handleLogin }) => {
    const user = useContext(UserContext);

    if (isLoggedIn) {
        return <div>
            {user && <h1>You are logged in as: {user.username}</h1>}
            <div>
                <Link to='/'>Home</Link>
            </div>
            <hr />
            <button onClick={handleLogout}>Logout</button>
        </div>
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <label>UserName:</label>
                <input type='text' placeholder='RonBurgondy' name='username' />
                <label>Password:</label>
                <input type='password' name='password' />
                <button type='submit' >Submit</button>
            </form>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <Link to='/signup'>Signup</Link>
            </div>
        </div>
    );
};

export default Login;
