import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Lists from './components/Lists/Lists';
import ListPage from './pages/ListPage';
import NavigationBar from './components/Navbar/Navbar';
import { getLoggedInUser, login, getListByID } from './api/UserAPI';
import UserContext from "./contexts/UserContext"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            if (localStorage.getItem("token") !== 'null') {
                let response = await getLoggedInUser(localStorage.getItem("token"));
                let data = await response.json();
                if (data.username) {
                    setIsLoggedIn(true);
                    setUser(data);
                }
            }
        }
        if (!user) {
            getUser();
        }
    }, [user])

    const handleLogin = async (evt) => {
        evt.preventDefault();
        let userObject = {
            username: evt.target.username.value,
            password: evt.target.password.value,
        }
        let response = await login(userObject);
        let data = await response.json();
        if (data.token) {
            localStorage.setItem("token", `${data.token}`);
            setIsLoggedIn(true);
            setUser(data.user);
        }
    }

    const handleLogout = () => {
        localStorage.setItem("token", null);
        setIsLoggedIn(false);
        setUser(null);
    }

    const renderLoginPage = () => {
        return (
            <LoginPage
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
        )
    }

    const renderHomePage = () => {
        return (
            <HomePage
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                getListByID={getListByID}
            />
        )
    }

    return (
        <div className="App">
            <Router>
                <UserContext.Provider value={user}>
                    <NavigationBar />
                    <Route exact path="/" render={renderHomePage} />
                    <Route exact path="/lists" component={Lists} />
                    <Route exact path="/lists/:listID" component={ListPage} />
                    <Route exact path="/login" render={renderLoginPage} />
                    <Route exact path="/signup" component={SignupPage} />
                </UserContext.Provider>
            </Router>
        </div>
    );
}

export default App;

