import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import YourCollection from './YourCollection';
import { getQuickCategories_Data } from '../actions/quickCategories_action';
import { getCategoryFilter_Data } from '../actions/contentcard_action';
import { TrendingTopics } from './TrendingTopics';
import variables from '../../variables';

class QuickCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // to activate css of icon on click iff category has data to show
      isActive: '',

      // to render YourCollection component--by default quick categories will render
      showYourCollection: false,
    };
    this.changeClassHandle = this.changeClassHandle.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
  }

  // receiving data from redux store to display clicked icon
  cataegoryFilter(category) {
    this.props.getCategoryFilter(category);
  }

  // changes color of clicked icon
  changeClassHandle(data) {
    this.setState({ isActive: data });
  }

  // handler for toggleSidebar event
  toggleSidebar() {
    this.setState({ showYourCollection: !this.state.showYourCollection });
  }

  // quick categories default data
  quickCategories() {
    console.log("this.props", this.props)
    if (this.props.categories.viewquickCategories_Data.result) {
      if (this.props.categories.viewquickCategories_Data.result.length > 0) {
        const my = this;
        var CategoriesMaping = this.props.categories.viewquickCategories_Data.result.map(data =>
          (<div
            key={data._id}
            className={
              my.state.isActive == data
                ? 'quick_categories_item border_right hover'
                : 'quick_categories_item border_right'
            }
            onClick={() => {
              my.cataegoryFilter(data.title);
            }}
          >
            <span
              onClick={() => {
                my.changeClassHandle(data);
              }}
            >
              <div className="img" data-toggle="tooltip" data-placement="top" title={data.title}>
                <img src={variables.url.liveURL + data.category_icon} />
              </div>
              <p className="text-muted category_title">
                {data.title}
              </p>
            </span>
          </div>),
        );
      }
    }

    return (
      <div className="sidebar1">
        <div className="row no_margin quick-heading">
          <div className="col-sm-8 no_padding padding_left">
            <p className="text no_padding">Quick Categories</p>
          </div>
          <div className="col-sm-4 quick-icon">
            <div className="reset" data-toggle="tooltip" data-placement="top" title="Turn Button">
              <img
                src="../assets/images/sidebar_icons/reset.png"
                onClick={this.toggleSidebar.bind(this)}
              />
            </div>
          </div>
        </div>
        <div className="row1">
          {CategoriesMaping}
        </div>
      </div>
    );
  }

  // YourCollection sidebar data
  urCollection() {
    return <YourCollection toggleMe={this.toggleSidebar.bind(this)} />;
  }

  render() {
    let sidebar1;
    if (this.state.showYourCollection) {
      sidebar1 = this.urCollection();
    } else {
      sidebar1 = this.quickCategories();
    }

    return (
      <div>
        {sidebar1}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const categories = state;
  return { categories };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => {
      dispatch(getQuickCategories_Data());
    },
    getCategoryFilter: (filter) => {
      dispatch(getCategoryFilter_Data(filter));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickCategories);
