import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Search from './Search';
import Dropdown from 'react-dropdown';
import { getTypeFilter } from '../actions/contentcard_action';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lout3: true,
      lout4: false,
      layout3: this.props.layout3,
      layout4: this.props.layout4,
      trendingsort: this.props.trendingsort,
      likesort: this.props.likesort,
      likelout: false,
      trendlout: true,
      dropdownOptions: [
        { value: 'Videos', label: 'video' },
        { value: 'Images', label: 'image' },
        { value: 'List', label: 'lists' },
      ],
      bollean: false,
      filterSelect: '',
      scroll: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  // Function To add class when header is fix
  handleScroll() {
    const d = document.documentElement;
    const offset = d.scrollTop;
    if (offset == 0) {
      this.setState({
        scroll: false,
      });
    } else {
      this.setState({
        scroll: true,
      });
    }
  }
  // For changing the background color on front page and call the action
  fill_bg_layout3() {
    this.state.layout3();
    this.setState({
      lout3: true,
      lout4: false,
    });
    console.log(this.state.lout3);
  }
  // For changing the background color on front page and call the action
  fill_bg_layout4() {
    this.state.layout4();
    this.setState({
      lout3: false,
      lout4: true,
    });
  }
  // Filtering function for dropdown filters
  setFilter(filter) {
    this.setState({
      filterSelect: filter,
    });
    this.props.getFilter(filter.label, this.state.likelout, this.state.trendlout);
  }
  // For changing the background color on front page and call the action
  fill_bg_likesort() {
    if (this.state.filterSelect) {
      this.props.getFilter(
        this.state.filterSelect.label,
        this.state.likelout,
        this.state.trendlout,
      );
    } else {
      console.log('else');
      this.state.likesort();
    }

    this.setState({
      likelout: !this.state.likelout,
    });
  }
  // For changing the background color on front page and call the action
  fill_bg_trendingsort() {
    if (this.state.filterSelect) {
      this.props.getFilter(
        this.state.filterSelect.label,
        this.state.likelout,
        this.state.trendlout,
      );
    } else {
      console.log('else');
      this.state.trendingsort();
    }
    this.setState({
      trendlout: !this.state.trendlout,
    });
  }

  render() {
    const array = this.state.dropdownOptions;
    return (
      <div className="container">
        <div className={this.state.scroll ? 'row header-section scroll' : 'row header-section'}>
          <div
            className="col-md-2 col-lg-2  header-logo"
            data-toggle="tooltip"
            data-placement="top"
            title="Risorso"
          >
            <NavLink to="/">
              <img src="../assets/images/main_logo.png" />
            </NavLink>
          </div>
          <div className="col-md-6 col-lg-6 search-wapper">
            <Search />
          </div>

          <div className="col-md-2 col-lg-2 list-icons-wapper">
            <ul className="list-icons">
              <li>
                <i
                  className={
                    this.state.lout3 == true ? 'ico-icon30 bgcolor' : 'ico-icon30 no_bgcolor'
                  }
                  aria-hidden="true"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="3 Column View"
                  onClick={this.fill_bg_layout3.bind(this)}
                />
              </li>
              <li>
                <i
                  className={
                    this.state.lout4 == true ? 'ico-icon29 bgcolor' : 'ico-icon29 no_bgcolor'
                  }
                  aria-hidden="true"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="4 Column View"
                  onClick={this.fill_bg_layout4.bind(this)}
                />
              </li>
              <li>
                <i
                  className={
                    this.state.likelout == true ? 'ico-icon28 bgcolor' : 'ico-icon28 no_bgcolor'
                  }
                  aria-hidden="true"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Sort by Likes"
                  onClick={this.fill_bg_likesort.bind(this)}
                />
              </li>
              <li>
                <i
                  className={
                    this.state.trendlout == true ? 'ico-icon27 bgcolor' : 'ico-icon27 no_bgcolor'
                  }
                  aria-hidden="true"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Sort By Trending"
                  onClick={this.fill_bg_trendingsort.bind(this)}
                />
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-lg-2 video-header">
            <div
              className="dropdown_menu"
              data-toggle="tooltip"
              data-placement="top"
              title="Videos"
            >
              <Dropdown
                className="dropdown"
                options={array}
                onChange={this.setFilter.bind(this)}
                value={this.state.filterSelect}
                placeholder="Videos"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const header = state;
  return { header };
}

function mapDispatchToProps(dispatch) {
  return {
    getFilter: (filter, like, trend) => {
      dispatch(getTypeFilter(filter, like, trend));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
