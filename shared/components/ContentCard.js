/*
  Component of Articles or contentcards.
  It imports Time Ago plug-in for changing the time zone format into hours and minutes ago.
  getContentCard is the redux-action to fetch the data of contentcards from backend.
*/
/*
  componentDidMount is used to call the redux-action before rendering and fetch all the data,
  it consists of "this.props.getContentCard(this.props.likesort, this.props.trendingsort);" ,
  which is used to call the getContentCard() from action and "(this.props.likesort,
  this.props.trendingsort)",are used as arguments to pass in redux action on which the sorting,
  for likes and trending will be done.

*/
/*
  "componentWillReceiveProps(nextProps)" Is used to call when the value of props will change,
  especially for props likesort and trendingsort, if there value will cahange it again goes to,
  redux action and hit the server URL.
*/
/*
  For layout change that is 3column view or 4 column view we are using props that is layout3 and,
  layout4. Its values are changing from header then passed to App.js and then in contentcard for ,
  toggling the classes of the content card.
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import { getContentCard } from '../actions/contentcard_action';
import variables from '../../variables';

class ContentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentArray: [],
      pageno: 1,
      status: false,
    };
  }
  componentDidMount() {
    this.props.getContentCard(this.props.likesort, this.props.trendingsort, this.state.pageno);
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  // for lazy loading--in progress
  handleScroll() {
    const d = document.documentElement;
    const offset = Math.ceil(d.scrollTop + window.innerHeight);
    const height = d.offsetHeight;
    if (offset == height) {
      this.setState({
        pageno: this.state.pageno + 1,
        status: true,
      });
      this.props.getContentCard(this.props.likesort, this.props.trendingsort, this.state.pageno);
    }
  }

  // getting all data on page as component loads
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      if (
        this.props.likesort != nextProps.likesort ||
        this.props.trendingsort != nextProps.trendingsort
      ) {
        this.props.getContentCard(nextProps.likesort, nextProps.trendingsort, this.state.pageno);
        console.log(nextProps);
        // this.setState({
        //   status: false,
        //   contentArray: this.state.contentArray.concat(nextrops.contentdata.viewContentCard.result),
        // })
      }
    }
    if (this.state.status) {
      this.setState({
        contentArray: this.state.contentArray.concat(nextProps.contentdata.viewContentCard.result),
      });
    }
  }

  render() {
    if (this.props.contentdata.viewContentCard.result) {
      if (this.props.contentdata.viewContentCard.result.length > 0) {
        const my = this;
        let data = '';
        if (my.state.contentArray.length > 0) {
          data = my.state.contentArray;
        } else {
          data = this.props.contentdata.viewContentCard.result;
        }
        var contentMapping = data.map(data =>
          (<div
            key={data._id}
            className={
              my.props.layout3 == true && my.props.layout4 == false
                ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4 no_padding padding_left'
                : my.props.layout4 == true && my.props.layout3 == false
                  ? 'col-xs-3 col-sm-3 col-md-3 col-lg-3 no_padding padding_left'
                  : 'col-xs-4 col-sm-4 col-md-4 col-lg-4 no_padding padding_left'
            }
          >
            <div className="panel content-card">
              <img
                className="img-responsive card-image"
                src={variables.url.liveURL + data.featuring_image}
                alt="content card img"
              />
              <div className="panel-body">
                <div
                  className={
                    my.props.layout3 == true && my.props.layout4 == false
                      ? 'content-card-section1'
                      : my.props.layout4 == true && my.props.layout3 == false
                        ? 'content-card4-section1'
                        : 'content-card-section1'
                  }
                >
                  <div className="content-card-title">
                    <p>
                      {data.publishing_channel},{' '}
                      <span className="text-muted">
                        <TimeAgo date={data.published_time} />
                      </span>
                    </p>
                  </div>
                  <div className="content-card-info">
                    <a>
                      <h3>
                        {data.content_title}
                      </h3>
                    </a>
                    <p className="text-muted">
                      {data.content_description}
                    </p>
                  </div>
                </div>
                <div
                  className={
                    my.props.layout3 == true && my.props.layout4 == false
                      ? 'content-card-section2'
                      : my.props.layout4 == true && my.props.layout3 == false
                        ? 'content-card4-section2'
                        : 'content-card-section2'
                  }
                >
                  <ul>
                    <li>
                      <img
                        src={variables.url.liveURL + data.channel_logo}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Channel Logo"
                      />
                    </li>
                    <li>
                      <img src="assets/images/content-card/banner-icon-divider.png" />
                    </li>
                    <li>
                      <img
                        src={variables.url.liveURL + data.quick_category_icon}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Quick Category"
                      />
                    </li>
                    <li>
                      <img src="assets/images/content-card/banner-icon-divider.png" />
                    </li>
                    <li>
                      <img
                        src={variables.url.liveURL + data.content_type_icon}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Content Type"
                      />
                    </li>
                  </ul>
                </div>
                <div
                  className={
                    my.props.layout3 == true && my.props.layout4 == false
                      ? 'content-card-footer'
                      : my.props.layout4 == true && my.props.layout3 == false
                        ? 'content-card4-footer'
                        : 'content-card-footer'
                  }
                >
                  <ul>
                    <li>
                      <i
                        className="ico-icon42 footer-icons"
                        aria-hidden="true"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Trending"
                      />
                      <span className="text-muted">
                        {data.trend_graph}
                      </span>
                    </li>

                    <li>
                      <i
                        className="ico-icon44 footer-icons text-muted"
                        aria-hidden="true"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Comments"
                      />
                      <span className="text-muted">
                        {data.comments}
                      </span>
                    </li>

                    <li>
                      <i
                        className="ico-icon43 footer-icons text-muted"
                        aria-hidden="true"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Likes"
                      />
                      <span className="text-muted">
                        {data.likes}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>),
        );
      }
    }

    return (
      <div>
        {contentMapping}
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentCard);
