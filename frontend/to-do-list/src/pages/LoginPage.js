import { Component } from "react"
import toDoAPI from "../api/toDoAPI"

class LoginPage extends Component {
  
  // helper
  handleLogin = async (e) => {
    e.preventDefault()

    let username = e.target.username.value
    let password = e.target.password.value

    let credentials = {
      username: username,
      password: password
    }

    try {
      let data = await toDoAPI.doLogin(credentials)
      if (data) {
        this.props.completeLogin(data)
        this.props.history.push("/") // redirect to home page
      }
    } 
    catch {

    }
  }
  
  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={this.handleLogin}>
          <label>Username:</label>
          <input name="username" />
          <br />
          <label>Password:</label>
          <input name="password" type="password" />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LoginPage;