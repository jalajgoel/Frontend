/*
  Profile Pic Upload and Preview Component.
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import DropToUpload from 'react-drop-to-upload';
import SparkMD5 from 'spark-md5';
import Cookies from 'universal-cookie';
import { imgUpload } from '../../../actions/upload_action';
import ProgressBar from '../../progressBar';
// import LoadingBar from 'react-redux-loading-bar';
// import {react-progress-bar} from 'simple-react-progress-bar'; not working
import Progress from 'react-progressbar';

class ImgUpload extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleDrop = this.handleDrop.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleOver = this.handleOver.bind(this);
    this.state = {
      active: 0,
      drops: [],
      file: '',
      imagePreviewUrl: '',
      startLoading: false,
      completeLoading: false,
      progress: 0,
      imgName: '',
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem(`imageUrl${this.props.ID}`))) {
      const data = JSON.parse(localStorage.getItem(`imageUrl${this.props.ID}`));
      console.log('data', data);
      this.setState({
        imagePreviewUrl: data[0].url,
        progress: 100,
      });
    }
    // else {
    //   this.setState({
    //     imagePreviewUrl: '../assets/images/no-image-available.png',
    //   });
    // }
  }

  /*
    Function detechChange(e) used here to detect the change in the input tag,
    used for click functionality.
  */
  detechChange(e) {
    // console.log(this.props.ID);
    e.preventDefault();
    const self = this;
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const imgName = e.target.files[0].name;
      console.log(e.target.files[0], 'file');
      reader.onload = function (e) {
        const imgData = [
          {
            id: self.props.ID,
            name: 'main image',
            url: e.target.result,
          },
        ];
        localStorage.setItem(`imageUrl${self.props.ID}`, JSON.stringify(imgData));
        const stateData = JSON.parse(localStorage.getItem(`imageUrl${self.props.ID}`));
        // console.log("data", stateData[0].url);
        const imageUrl = stateData[0].url;
        self.setState({ imagePreviewUrl: imageUrl, progress: 100, imgName });
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    // const cookies = new Cookies();
    // const token_val = cookies.get('risorsoLoggedIn');
    // const data = new FormData();
    // data.append('profile_picture', e.target.files[0]);
    // this.props.uploadImage(data, token_val);
  }

  // Function handleDrop(files) used here to upload images in drag and drop.
  handleDrop(files) {
    const cookies = new Cookies();
    const token_val = cookies.get('risorsoLoggedIn');
    const data = new FormData();
    data.append('profile_picture', files[0]);
    this.props.uploadImage(data, token_val);
  }

  /*
    Function handleLeave() used here to change the state for the drag component,
    when the drag leaves the div.
  */
  handleLeave() {
    this.setState({ active: 0 });
  }

  /*
    Function handleOver() used here to change state for the drag component,
    When the drag enters the div.
  */
  handleOver() {
    this.setState({ active: 1 });
  }

  /*
    Function triggerClick(e) used here to call the <input type="file"/>,
    tag on click of the upload div.
  */

  triggerClick(e) {
    this.inputElement.click();
  }

  /*
    Function startLoading() used here to start the loading of the progress bar,
    when the redux return 'REQUEST' response.
  */
  startLoading() {
    this.setState({
      startLoading: true,
    });
  }

  /*
    Function endLoading() used here to end the loading of the progress bar,
    when the redux return 'SUCCESS'/'ERROR' response.
  */
  endLoading() {
    this.setState({
      completeLoading: true,
    });
  }

  /*
    Function resetLoading() used here to reset the loading of the progress bar,
    when the redux return response.
  */
  resetLoading() {
    this.setState({
      startLoading: false,
      completeLoading: false,
    });
  }

  errorMessage() {
    alert('blank field not allowed');
  }

  render() {
    // console.log("prop",this.state.imagePreviewUrl)
    // var image= localStorage.getItem(`imageUrl${this.props.ID}`)
    // console.log("image",image)
    return (
      <div className="parentSection">
        <div className="childSection1 no-drag sub-header">
          <ul className="image-uplode-top-bar">
            <li className="active" onClick={this.props.setUpload}>
              <span className="Image-up" />Upload Image
            </li>
            <li onClick={this.props.setCrop}>
              <span className="Crop" />Crop
            </li>
            <li onClick={this.props.setDetails}>
              <span className="Details" />Details
            </li>
          </ul>
          <ul className="text-muted pull-right no-drag">
            <li>
              <img
                src="../assets/images/user-profile/article-icon-2.png"
                onClick={this.props.delete}
              />
            </li>
          </ul>
        </div>
        <div className="childsection2 no-drag">
          <div className="col-xs-16 col-md-6">
            <form encType="multipart/form-data" className="no-drag">
              <DropToUpload
                element="div"
                onDrop={this.handleDrop}
                onLeave={this.handleLeave}
                onOver={this.handleOver}
              >
                {this.state.active
                  ? <div className="pro-pic-file">
                    <img src="../assets/images/uplode-icon.png" />
                    <p>Drop Here</p>
                  </div>
                  : <div className="pro-pic-file" onClick={this.triggerClick.bind(this)}>
                    <img src="../assets/images/uplode-icon.png" />
                    <p>Drag & Drop a File or Click to Select From Your Computer</p>
                  </div>}
              </DropToUpload>
              <input
                className="no-drag"
                type="file"
                name="files"
                id="imgInp"
                onChange={this.detechChange.bind(this)}
                onDrop={this.detechChange.bind(this)}
                ref={input => (this.inputElement = input)}
              />
              <p className="upload-with-url">Upload with URL</p>
              <input
                autoFocus
                type="text"
                placeholder="Paste The Url Of The Image Here"
                className="image-uplode-input"
              />
            </form>
          </div>
          <div className="col-xs-16 col-md-6">
            <div className="image-upload">
              <p className="upload-with-url">
                Progress <span className="pull-right">{this.state.imgName}</span>
              </p>

              <div className="progress-bar">
                <Progress completed={this.state.progress} />

                {/* id="progressBar-container"<ProgressBar completed={this.state.completeLoading} loading={this.state.startLoading} resetLoading={this.resetLoading} /> */}
              </div>
              <span className="upload-with-url">Preview</span>
              <div className="image-preview">
                <img
                  src={
                    this.state.imagePreviewUrl
                      ? this.state.imagePreviewUrl
                      : '../assets/images/no-image-available.png'
                  }
                  className="imgprv"
                />
              </div>
            </div>
            <button
              className="btn cancelBtn green-button pull-right"
              onClick={
                this.state.imagePreviewUrl == ''
                  ? this.errorMessage.bind(this)
                  : this.props.nextChange
              }
              id = {this.props.ID}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const ImgUpload = state;
  return { ImgUpload };
}

function mapDispatchToProps(dispatch, props) {
  return {
    uploadImage: (data, token_val) => {
      dispatch(imgUpload(data, token_val));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgUpload);
