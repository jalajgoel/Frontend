import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import variables from '../../../../variables';
import { Redirect } from 'react-router-dom';
import FromRisorso from './FromRisorso';
import FromAnotherResource from './FromAnotherResource';

class RelatedArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: true,
      fromRisorso: true,
      fromAnotherRisorso: false,
      colorFromRisorso: true,
      colorAnotherResource: false,
    };
  }

  openSelectOptions() {
    this.setState({ selectOptions: !this.state.selectOptions });
  }

  selectOptions() {
    if (this.state.selectOptions) {
      return (
        <ul className="text-muted">
          <li
            className={this.state.colorFromRisorso ? 'colorChange' : ''}
            id="From-Risorso"
            onClick={this.fromRisorso.bind(this)}
          >
            <i
              className="ico-icon35"
              aria-hidden="true"
              data-toggle="tooltip"
              data-placement="top"
              title="From Risoso"
            />
            From Risorso
          </li>
          <li
            className={this.state.colorAnotherResource ? 'colorChange' : ''}
            id="From-Another-Resource"
            onClick={this.fromRisorso.bind(this)}
          >
            <i
              className="ico-icon38"
              aria-hidden="true"
              data-toggle="tooltip"
              data-placement="top"
              title="From Risoso"
            />
            From Another Resource
          </li>
        </ul>
      );
    }
  }

  fromRisorso(e) {
    if (e.target.id == 'From-Another-Resource') {
      this.setState({
        fromAnotherRisorso: true,
        fromRisorso: false,
        colorAnotherResource: true,
        colorFromRisorso: false,
      });
    } else {
      this.setState({
        fromAnotherRisorso: false,
        fromRisorso: true,
        colorAnotherResource: false,
        colorFromRisorso: true,
      });
    }
  }

  renderData() {
    if (this.state.fromRisorso) {
      return <FromRisorso />;
    }
    return <FromAnotherResource />;
  }

  render() {
    const selectOptions = this.selectOptions();
    const renderData = this.renderData();
    return (
      <div className="parentSection">
        <div className="childSection1 sub-header text-center">
          <h6>Related Article</h6>
          <span className="select-source">
            {selectOptions}
          </span>
          <ul className="text-muted pull-right">
            <li>
              <img
                src="../assets/images/user-profile/article-icon-1.png"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
                onClick={this.openSelectOptions.bind(this)}
              />
            </li>
            <li>
              <img src="../assets/images/user-profile/article-icon-2.png" />
            </li>
            <li>
              <img src="../assets/images/user-profile/article-icon-3.png" />
            </li>
          </ul>
        </div>
        <div className="childsection2">
          {renderData}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const relatedArticle = state;
  return { relatedArticle };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(RelatedArticle);
