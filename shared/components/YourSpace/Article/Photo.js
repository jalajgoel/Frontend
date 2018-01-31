// Component For loading components like upload image , crop image and adding details for image alt tag.

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ImgCrop from './ImgCrop';
import ImgDetails from './ImgDetails';
import ImgUpload from './ImgUpload';

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextCount: 1,
    };
  }

  // Function nextChange() id used here for accepting next clicks from other components.
  nextChange() {
    const count = this.state.nextCount + 1;
    this.setState({
      nextCount: count,
    });
  }

  // Function setUpload(),setCrop() & setDetails() are used to change the layout from header clicks.
  setUpload() {
    const count = 1;
    this.setState({
      nextCount: count,
    });
  }
  setCrop() {
    const count = 2;
    this.setState({
      nextCount: count,
    });
  }
  setDetails() {
    const count = 3;
    this.setState({
      nextCount: count,
    });
  }

  render() {
    if (this.state.nextCount == 2) {
      return (
        <div>
          <ImgCrop
            nextChange={this.nextChange.bind(this)}
            setUpload={this.setUpload.bind(this)}
            setCrop={this.setCrop.bind(this)}
            setDetails={this.setDetails.bind(this)}
            ID={this.props.ID}
            delete={this.props.delete}
          />
        </div>
      );
    } else if (this.state.nextCount == 3) {
      return (
        <div>
          <ImgDetails
            setUpload={this.setUpload.bind(this)}
            setCrop={this.setCrop.bind(this)}
            setDetails={this.setDetails.bind(this)}
            ID={this.props.ID}
            delete={this.props.delete}
          />
        </div>
      );
    }
    return (
      <div>
        <ImgUpload
          nextChange={this.nextChange.bind(this)}
          setUpload={this.setUpload.bind(this)}
          setCrop={this.setCrop.bind(this)}
          setDetails={this.setDetails.bind(this)}
          ID={this.props.ID}
          delete={this.props.delete}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const Photo = state;
  return { Photo };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
