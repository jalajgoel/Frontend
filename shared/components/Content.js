// Component containing all the components rendering,
// of all child Routes.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Sidebar from './Sidebar';
import ContentCard from './ContentCard';

class Content extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className="sidebar-wapper no_padding">
          <Sidebar />
        </div>
        <div className="main-wapper no_padding">
          <div className="row no_margin">
            <ContentCard
              layout3={this.props.layout3}
              layout4={this.props.layout4}
              likesort={this.props.likesort}
              trendingsort={this.props.trendingsort}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const data = state;
  return { data };
}
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
