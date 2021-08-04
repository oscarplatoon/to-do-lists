import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom"
// pages
import HomePage from "./pages/HomePage"
import TaskListPage from "./pages/TaskListPage"
import TaskPage from "./pages/TaskPage"
import LoginPage from "./pages/LoginPage"
// context
import UserContext from './contexts/UserContext';


class App extends Component {
  state = {
    user: null
  }

  // helper
  updateUser = (newUserData) => {
    console.log(newUserData)
    this.setState({user: newUserData })
  }

  // render
  renderLoginPage = (routeProps) => {
    return <LoginPage {...routeProps} completeLogin={this.updateUser} />
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={this.state.user}>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact render={this.renderLoginPage} />
              <Route path="/task-lists/:taskListId" exact component={TaskListPage} />
              <Route path="/task-lists/:taskListId/tasks/:taskId" exact component={TaskPage} />
            </div>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
