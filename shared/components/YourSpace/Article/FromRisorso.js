import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import variables from '../../../../variables';
import { Redirect } from 'react-router-dom';

class FromRisorso extends Component {
  constructor(props) {
    super(props);
  }

  submitFromRosorso() {
    console.log('hello');
  }

  handleCancel() {
    console.log('me');
  }

  render() {
    return (
      <div>
        <form>
          <input
            className="form-control"
            type="text"
            name="fromRisorso"
            placeholder="Search in Risorso"
          />
          <div>search content here....</div>
          <div className="text-right">
            <button
              id={this.props.ID}
              className="btn cancelBtn"
              onClick={this.handleCancel.bind(this)}
            >
              Cancel
            </button>
            <input
              autoFocus
              id={this.props.ID}
              type="submit"
              name="AboutUs_submit"
              value="Save"
              className="submit_button append-margin saveBtn"
              onClick={this.submitFromRosorso.bind(this)}
            />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const fromRisorso = state;
  return { fromRisorso };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(FromRisorso);
