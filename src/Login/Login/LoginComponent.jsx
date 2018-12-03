import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import ForgotPassword from '../ForgotPassword/ForgotPasswordComponent.jsx';
// import Register from '../Register/RegisterComponent.jsx';

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      password: null
    }
  }

  //Lifecycle Methods
  componentDidMount() { }

  //Helper functions
  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    console.log("Login - handleLogin this.props:", this.props);
    console.log("Login Successful! User credentials:", this.state);
    this.props.history.push(`/`); //change this to authenticated view when created
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>

          <label>Email:</label>
          <input onChange={this.handleChange} type='text' name="email" placeholder="enter email" />
          <br /><br />

          <label>Password:</label>
          <input onChange={this.handleChange} type='password' name="password" placeholder="enter password" />
          <br /><br />

          <button type="submit">Login</button>

        </form>

        <Link to="/login/forgotPassword">
          <button type="button">Forgot Password?</button>
        </Link>
        <Link to="/login/register">
          <button type="button">Register</button>
        </Link>

      </div>
    )
  }
}


export default Login;