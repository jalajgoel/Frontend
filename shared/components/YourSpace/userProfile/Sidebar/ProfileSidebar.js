import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';
// import variables from '../../../variables';

class ProfileSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="userprofile-heading">Your Space </div>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/bookmarks.png" />
          <p>Bookmarks</p>
        </div>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/statistics.png" />
          <p>Statistics</p>
        </div>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/feeds.png" />
          <p>Feeds</p>
        </div>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/channels.png" />
          <p>Your Channels</p>
        </div>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/responses.png" />
          <p>Responses</p>
        </div>
        <NavLink to="/createarticle">
          <div className="userprofile-data active">
            <img src="../assets/images/user-profile/create.png" />
            <p>Create</p>
          </div>
        </NavLink>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/highlights.png" />
          <p>Highlights</p>
        </div>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/collaboration.png" />
          <p>Collaboration</p>
        </div>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/notes.png" />
          <p>Notes</p>
        </div>
        <div className="userprofile-data">
          <img src="../assets/images/user-profile/settings.png" />
          <p>Settings</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const ProfileSidebar = state;
  return { ProfileSidebar };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSidebar);
