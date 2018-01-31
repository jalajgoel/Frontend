import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchLogin, fetchForgetPassword } from '../actions/login_action';
import { Redirect } from 'react-router-dom';
// import Profile from './Profile'
// import App from './App';

// import { instanceOf } from 'prop-types';
// import { withCookies, Cookies } from 'react-cookie';
import Cookies from 'universal-cookie';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showForgetPassword: false,
      message: '',
      email_msg: '',
      password_msg: '',
    };
  }
  componentWillMount() {}
  canBeSubmited() {
    const { email, password } = this.state;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email == ' ' && password == ' ') {
      return false;
    }
    if (reg.test(email) && password.length == 4) {
      return true;
    }
    const isEnabled = false;
    return isEnabled;
  }

  // handler for email
  handleEmailInput(e) {
    this.setState({ email: e.target.value });
    const email = e.target.value;
    // for email error message
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email)) {
      this.setState({ email_msg: ' ' });
      this.setState({ email });
    } else {
      this.setState({ email_msg: 'Enter valid email e.g. example@example.com' });
    }
  }

  handlePasswordInput(e) {
    this.setState({ password: e.target.value });
    const pswd = e.target.value;

    // for password error message
    const numbers = /^[0-9]+$/;

    // let pswd= this.state.password
    if (!(pswd.length == 4)) {
      this.setState({ password_msg: 'Incorrect password' });
    } else if (!numbers.test(this.state.password)) {
      this.setState({ password_msg: 'Incorrect password' });
    } else {
      this.setState({ password_msg: ' ' });
      this.setState({ password: pswd });
    }
  }

  login(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    this.props.fetchLogin(email, password);

    // to reset  input fields
    this.setState({ email: '', password: '' });
  }

  forgetPassword() {
    this.setState({ showForgetPassword: !this.state.showForgetPassword });
  }

  handleForgetPassword(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  fp_submit(e) {
    e.preventDefault();
    const email = this.state;
    this.props.fetchForgetPassword(this.state.email);
  }

  render() {
    const isEnabled = this.canBeSubmited();
    const token = this.props.logindata.fetchLogin.response.token;
    const cookie_token = this.props.logindata.fetchLogin.response.token;
    const cookies = new Cookies();
    if (!(token == undefined)) {
      cookies.set('risorsoLoggedIn', token, { path: '/' });
    }

    // document.cookie= "loggedIn_token="+token
    // var x= document.cookie
    if (token) {
      return <Redirect to="/" />;
    }

    let res_received;
    if (this.props.logindata.fetchLogin.response.message) {
      res_received = (
        <span className="response">
          {this.props.logindata.fetchLogin.response.message}
        </span>
      );
    }

    return (
      <div className="login_section">
        <div className="login_img">
          <span className="login_text">Log In</span>
          <img src="../assets/images/login/login.png" alt="login_img" />
        </div>
        <div className="login_input">
          <form onSubmit={this.login.bind(this)}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="user_inputs_login form-control password_note"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEmailInput.bind(this)}
              />
              <span className="errorMessage">
                {this.state.email_msg}
              </span>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="user_inputs_login form-control password_note"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordInput.bind(this)}
                maxLength="4"
              />
              <span className="errorMessage">
                {}
              </span>
            </div>
            <div className="form-group">
              <span>
                <a onClick={this.forgetPassword.bind(this)}>Forgot password?</a>
              </span>
            </div>
            <div className="form-group text-right">
              <input
                type="submit"
                name="Login_submit"
                value="Log In"
                className={isEnabled == true ? 'submit_button' : 'IMDisabled'}
                disabled={!isEnabled}
              />
            </div>
          </form>
          {res_received}
        </div>
        <div className={this.state.showForgetPassword == false ? 'hide-modal' : 'modal'}>
          <div className="modal-content">
            <form onSubmit={this.fp_submit.bind(this)}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Registered Your Email"
                  value={this.state.email}
                  onChange={this.handleForgetPassword.bind(this)}
                />
              </div>
              <div className="form-group text-right">
                <input type="submit" name="fp_submit" value="Send" className="submit_button" />
                <button
                  className="submit_button close_btn"
                  onClick={this.forgetPassword.bind(this)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const logindata = state;
  return { logindata };
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchLogin: (email, password) => {
      dispatch(fetchLogin(email, password));
    },
    fetchForgetPassword: (email) => {
      dispatch(fetchForgetPassword(email));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
