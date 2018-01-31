// Component For adding Image Crop Functionality to the uploaded image.

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cropper from 'react-cropper';
import { multipleImage } from '../../../actions/upload_action';

class ImgCrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
      crop: {
        x: 10,
        y: 5,
        width: 10,
        height: 5,
      },
      imageCroppedUrl: '',
      scale: 0.1,
      cropperHeading: 'Card Image',
      recropCard: false,
      recropCover: false,
      cropImage: false,
      autoCrop: false,
    };
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem(`imageUrl${this.props.ID}`))) {
      const data = JSON.parse(localStorage.getItem(`imageUrl${this.props.ID}`));
      this.setState({
        imagePreviewUrl: data[0].url,
      });
    }
    // } else {
    //   this.setState({
    //     imagePreviewUrl: '../assets/images/no-image-available.png',
    //   });
    // }
  }

  _crop(files) {
    const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
    console.log('file', files);
    this.setState({
      imageCroppedUrl: dataUrl,
    });
    const imgData = {
      id: this.props.ID,
      name: 'card image',
      url: dataUrl,
    };
    localStorage.setItem('cardImg', JSON.stringify(imgData));
    const coverImg = {
      id: this.props.ID,
      name: 'cover image',
      url: dataUrl,
    };
    localStorage.setItem('coverImg', JSON.stringify(coverImg));
    const data = new FormData();
    data.append('profile_picture', files);
    // this.props.addImage(data);
  }
  handleScale(e) {
    const scale = parseFloat(e.target.value);
    console.log(scale);
    this.setState({ scale });
  }

  doneCrop() {
    this.setState({
      cradImageCrop: this.state.imageCroppedUrl,
    });
  }

  save() {
    console.log('canvas');
  }

  recropCard(e) {
    console.log('id', e.target.id);
    this.setState({
      cropperHeading: e.target.id,
      recropCard: true,
      recropCover: false,
      autoCrop: true,
    });
  }

  recropCover(e) {
    console.log('id', e.target.id);
    this.setState({
      cropperHeading: e.target.id,
      recropCard: false,
      recropCover: true,
      autoCrop: true,
    });
  }

  imgCrop() {
    if (this.state.autoCrop) {
      return (
        <div className="no-drag drag-event">
          <Cropper
            src={this.state.imagePreviewUrl}
            className="no-drag drag-event"
            viewMode={1}
            checkOrientation
            guides={false}
            autoCrop
            autoCropArea={0.7}
            minContainerWidth={100}
            minContainerHeight={100}
            scalable={false}
            ref="cropper"
            movable
            wheelZoomRatio={this.state.scale}
            zoomOnWheel
            cropBoxMovable={false}
            cropBoxResizable={false}
            crop={this._crop.bind(this)}
            preview=".preview"
            dragMode="move"
            toggleDragModeOnDblclick={false}
          />
          <input
            name="scale"
            type="range"
            onChange={this.handleScale.bind(this)}
            max="1"
            step="0.01"
            defaultValue="0.1"
            className="slider no-drag drag-event"
          />
        </div>
      );
    }
    return (
      <div className="no-drag drag-event">
        <img src={this.state.imagePreviewUrl} />
        <input
          name="scale"
          type="range"
          onChange={this.handleScale.bind(this)}
          max="1"
          step="0.01"
          defaultValue="0.1"
          className="slider no-drag drag-event"
        />
      </div>
    );
  }

  render() {
    const cropper = this.imgCrop();
    console.log(
      'this.state.recropCard',
      this.state.recropCard,
      'this.state.recropCover',
      this.state.recropCover,
    );
    return (
      <div className="imgCrop-section parentSection no-drag drag-event">
        <div className="childSection1 no-drag drag-event sub-header">
          <h6 className="no-drag drag-event">Image</h6>
          <ul className="image-uplode-top-bar no-drag drag-event">
            <li onClick={this.props.setUpload} className="no-drag drag-event">
              <span className="Image-up no-drag drag-event" />Upload Image
            </li>
            <li className="active no-drag drag-event" onClick={this.props.setCrop}>
              <span className="Crop no-drag drag-event" />Crop
            </li>
            <li onClick={this.props.setDetails} className="no-drag drag-event">
              <span className="Details no-drag drag-event" />Details
            </li>
          </ul>
          <ul className="text-muted pull-right no-drag drag-event">
            <li className="no-drag drag-event">
              <img
                src="../assets/images/user-profile/article-icon-2.png"
                className="no-drag drag-event"
                onClick={this.props.delete}
              />
            </li>
          </ul>
        </div>
        <div className="childsection2 no-drag imgCrop-wapper">
          <div className="col-xs-16 col-md-6 left-section no-drag">
            <h4>
              {this.state.cropperHeading}
            </h4>
            {cropper}
          </div>
          <div className="col-xs-16 col-md-6 right-section">
            <h4>Preview</h4>
            <div className="sm-img">
              <div className="img-section">
                <img src={this.state.cradImageCrop} className="preview" />
              </div>
              <div className="button-section pull-right">
                <p>Card Image</p>
                <button
                  className="btn cancelBtn"
                  id="Card Image"
                  onClick={
                    this.state.recropCard ? this.doneCrop.bind(this) : this.recropCard.bind(this)
                  }
                >
                  {this.state.recropCard ? 'Save' : 'Recrop'}
                </button>
              </div>
            </div>
            <div className="lg-img">
              <div className="img-section">
                <img src={this.state.imagePreviewUrl} />
              </div>
              <div className="button-section pull-right">
                <p>Cover Image</p>
                <button
                  className="btn cancelBtn recrop-button"
                  id="Cover Image"
                  onClick={
                    this.state.recropCover ? this.doneCrop.bind(this) : this.recropCover.bind(this)
                  }
                >
                  {this.state.recropCover ? 'Save' : 'Recrop'}
                </button>
              </div>
            </div>
            <button
              className="btn cancelBtn green-button pull-right"
              onClick={this.props.nextChange}
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
  const ImgCrop = state;
  return { ImgCrop };
}

function mapDispatchToProps(dispatch, props) {
  return {
    addImage: (data) => {
      dispatch(multipleImage(data));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ImgCrop);
