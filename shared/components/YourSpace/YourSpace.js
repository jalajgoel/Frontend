import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import variables from '../../../variables';
import UserProfile from './userProfile/UserProfile';

class YourSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <UserProfile />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const contentdata = state;
  return { contentdata };
}

function mapDispatchToProps(dispatch, props) {
  return {
    getContentCard: (like, trending, pageno) => {
      dispatch(getContentCard(like, trending, pageno));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(YourSpace);
