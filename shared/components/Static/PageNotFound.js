import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

class PageNotFound extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="page-not-wapper">
        <img src="../assets/images/user-profile/404.png" alt="profile pic" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const PageNotFound = state;
  return { PageNotFound };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
