import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import Cookies from 'universal-cookie';
import { getData } from '../actions/userProfile_action';

class Spacetab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logButton: 'login',
    };
  }
  componentWillMount() {
    const cookies = new Cookies();
    const space = cookies.get('risorsoLoggedIn');
    if (space) {
      // this.props.fetchData(space);
      this.setState({
        logButton: 'logout',
      });
    } else {
      // console.log(err);
    }
  }
  handleAuth() {
    fetch('http://192.168.20.127:4000/api/connect/facebook', {
      method: 'get',
    }).then((res) => {
      if (res) {
        window.open(res.url);

        // return dispatch(handleAboutUs(res));
      }
      // return dispatch(handleFormError(res));
    });
    // .catch(err => dispatch(handleFormError(err)));
  }
  render() {
    if (this.props.spaceTabData.fetchUserProfile.response) {
      if (this.props.spaceTabData.fetchUserProfile.response.length > 0) {
      }
    }

    return (
      <div className="sidebar3">
        <div className="row no_margin">
          <div className="col-sm-12 no_padding">
            <div className="row no_margin space">
              <div className="col-sm-3 col-lg-3 col-md-3 space_pic">
                <div
                  className="space_profile space_tabs"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Profile Image"
                >
                  <NavLink to="/yourspace">
                    <img src="../assets/images/user_ico.png" className="space_image" />
                  </NavLink>
                </div>
              </div>
              <div
                className="col-sm-3 col-lg-3 col-md-3 space_messages space_tabs"
                data-toggle="tooltip"
                data-placement="top"
                title="Messages"
              >
                <img
                  src="../assets/images/sidebar_icons/message-icon.png"
                  className="space_image"
                />
              </div>
              <div
                className="col-sm-3 col-lg-3 col-md-3 space_edit space_tabs"
                data-toggle="tooltip"
                data-placement="top"
                title="Create"
              >
                <NavLink to="/createarticle">
                  <img src="../assets/images/sidebar_icons/edit-icon.png" className="space_image" />
                </NavLink>
              </div>
              <div
                className="col-sm-3 col-lg-3 col-md-3 space_log space_tabs"
                data-toggle="tooltip"
                data-placement="top"
                title="Login"
              >
                <NavLink to="/login">
                  <img src="../assets/images/sidebar_icons/log-out.png" className="space_image" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const spaceTabData = state;
  return { spaceTabData };
}

function mapDispatchToProps(dispatch, props) {
  return {
    // fetchData: (spaceTabData) => {
    //   dispatch(getData(spaceTabData));
    // },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spacetab);
