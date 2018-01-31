/*
	Parent Login is the parent component for login and and sign up
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Login from './Login';
import SignUp from './SignUp';

class Parentlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: '',
    };
  }
  render() {
    return (
      <div className="parentlogin">
        <div className="row no_margin">
          <div className="col-sm-12">
            <div className="col-sm-6 login_col no_padding">
              <Login />
            </div>
            <div className="col-sm-6 no_padding">
              <SignUp />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const check = state;
  return { check };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Parentlogin);
