import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';
// import variables from '../../../variables';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkData(e) {
    
    var mainTitle = JSON.parse(localStorage.getItem('mainTitle')),
        channel_data = JSON.parse(localStorage.getItem('channel_data')),
        category_data = JSON.parse(localStorage.getItem('category_data')),
        content_description = JSON.parse(localStorage.getItem('content_description'));

        if(mainTitle == null || channel_data == null || category_data == null || content_description == null) {
          alert("Please fill the required fields firs");
          e.preventDefault();      
          return false;
        }

  }

  render() {
    return (
      <div className="parentSection">
        <div className="article-header childSection1">
          <div className="col-sm-6 ">
            <h5>Make a New Post</h5>
          </div>
          <div className="col-sm-6 text-right childSection2">
            <NavLink to="/previewarticle">
              <button type="button" className="btn btn-Preview" onClick={this.checkData.bind(this)}>
                Preview Post
              </button>
            </NavLink>
            <button type="button" className="btn btn-Save">
              Save Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const Header = state;
  return { Header };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
