import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { fetchSignup } from '../actions/signup_action';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: '',
      email_msg: '',
      password_msg: '',
      response: '',
    };
  }

  // handler for email. giving messages below email input if email is not valid input
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

  // handler for password. giving messages below password
  // if password is not of 4 digits and it must be numeric
  handlePasswordInput(e) {
    this.setState({ password: e.target.value });
    const pswd = e.target.value;
    // for password error message
    const numbers = /^[0-9]+$/;
    // let pswd= this.state.password

    if (!(pswd.length == 4)) {
      this.setState({
        password_msg: 'Could be 4 digits, easy password You might need to change it later tough',
      });
    } else if (!numbers.test(this.state.password)) {
      this.setState({ password_msg: 'Password must be numeric!' });
    } else {
      this.setState({ password_msg: ' ' });
      this.setState({ password: pswd });
    }
  }

  /* for disabling submit button if input fiels are empty--
email is not a valid input --password is not numeric and  of 4 digits */
  canBeSubmited() {
    const { email, password } = this.state;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const numbers = /^[0-9]+$/;
    if (email == ' ' && password == ' ') {
      return false;
    }
    if (reg.test(email) && password.length == 4 && numbers.test(password)) {
      return true;
    }
    const isEnabled = false;
    return isEnabled;
  }

  // handling signup request. called when submit button is clicked.
  handleSignUp(e) {
    e.preventDefault();
    const signup_data = this.state;

    const email = this.state.email;
    const password = this.state.password;
    // sending received data i.e. email and password to redux action so as to send to backend server
    this.props.fetchSignup(email, password);

    // to reset  input fields
    this.setState({ email: '', password: '' });
  }

  render() {
    const isEnabled = this.canBeSubmited();
    let res_received;
    if (this.props.signupdata.fetchSignUp.response.message) {
      res_received = (
        <span className="response">
          {this.props.signupdata.fetchSignUp.response.message}
        </span>
      );
    }

    return (
      <div className="signUp_section">
        <div className="signUp_img">
          <span className="signup_text">Sign Up</span>
          <img src="../assets/images/login/signup.png" alt="signUp_img" />
        </div>
        <div className="signUp_input">
          <form onSubmit={this.handleSignUp.bind(this)}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="user_inputs_signup form-control password_note"
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
                className="user_inputs_signup form-control password_note"
                placeholder="Password"
                maxLength="4"
                value={this.state.password}
                onChange={this.handlePasswordInput.bind(this)}
              />
              <span className="errorMessage">
                {this.state.password_msg}
              </span>
            </div>
            <div className="form-group">
              <span>
                <a>Terms and Conditions</a>
              </span>
            </div>

            <div className="form-group text-right">
              <input
                type="submit"
                name="SignUp"
                value="Sign Up"
                data-toggle="tooltip"
                data-placement="top"
                title="SignUp"
                className={isEnabled == true ? 'submit_button' : 'IMDisabled'}
                disabled={!isEnabled}
              />
            </div>
          </form>
          {res_received}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const signupdata = state;
  return { signupdata };
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchSignup: (email, password) => {
      dispatch(fetchSignup(email, password));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
