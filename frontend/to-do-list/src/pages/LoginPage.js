import { Component } from "react";
import toDoAPI from '../api/toDoAPI'

class LoginPage extends Component {

  // helper function

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
      this.props.completeLogin(data)
      this.props.history.push('/')
    }

    catch {

    }




  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={this.handleLogin}>
          <br />
          <label>Username: </label>
          <input name='username' />

          <br />
          <br />
          <label>Password: </label>
          <input name='password' type='password'/>

          <br />
          <br />
          <button type='submit'>Login</button>

        </form>
      </div>
    )
  }
}

export default LoginPage;