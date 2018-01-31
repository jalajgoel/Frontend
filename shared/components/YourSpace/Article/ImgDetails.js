// Component For adding details for image tag.

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';

class ImgDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: '',
    };
  }

  componentDidMount() {
    const cardImg = JSON.parse(localStorage.getItem('cardImg'));
    if (cardImg) {
      this.setState({
        imagePreviewUrl: cardImg.url,
      });
    } else {
      this.setState({
        imagePreviewUrl: '../assets/images/no-image-available.png',
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("_imgFeaturing",this._imgFeaturing.checked);
    var imgTitle = this._imgTitle.value,
      imgDiscription = this._imgDiscription.value,
      imgOwner = this._imgOwner.value,
      imgUrl = this._imgUrl.value,
      imgFeaturing = this._imgFeaturing.checked,
      localData = JSON.parse(localStorage.getItem('article_data')),
      newData = {
        id: this.props.ID,
        rank: this.props.rank,
        type: 'photo',
        url: this.state.imagePreviewUrl,
        title: imgTitle,
        discription: imgDiscription,
        owner: imgOwner,
        imgUrl,
        featuring: imgFeaturing,
      };
    if (imgTitle == '' || imgDiscription == '' || (imgOwner == '' || imgUrl == '')) {
      alert("Photo Fields can't be empty");
      return false;
    }
    if (localData) {
      localData.push(newData);
      localStorage.setItem('article_data', JSON.stringify(localData));
      console.log('localData', localData);
      console.log(
        'imgTitle=',
        imgTitle,
        'imgDiscription=',
        imgDiscription,
        'imgOwner=',
        imgOwner,
        'imgUrl=',
        imgUrl,
        'imgFeaturing=',
        imgFeaturing,
      );
    } else {
      console.log(
        'imgTitle=',
        imgTitle,
        'imgDiscription=',
        imgDiscription,
        'imgOwner=',
        imgOwner,
        'imgUrl=',
        imgUrl,
        'imgFeaturing=',
        imgFeaturing,
      );
      var newData = [
        {
          id: this.props.ID,
          rank: this.props.rank,
          type: 'photo',
          url: this.state.imagePreviewUrl,
          title: imgTitle,
          discription: imgDiscription,
          owner: imgOwner,
          imgUrl,
          featuring: imgFeaturing,
        },
      ];
      localStorage.setItem('article_data', JSON.stringify(newData));
    }
  }

  render() {
    const imageUrl = this.state.imagePreviewUrl;
    return (
      <div className="imgdetails-section parentSection">
        <div className="childSection1 no-drag sub-header">
          <ul className="image-uplode-top-bar">
            <li onClick={this.props.setUpload}>
              <span className="Image-up" />Upload Image
            </li>
            <li onClick={this.props.setCrop}>
              <span className="Crop" />Crop
            </li>
            <li className="active" onClick={this.props.setDetails}>
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
        <div className="childsection2 no-drag imgCrop-wapper">
          <div className="col-xs-16 col-md-6 left-section">
            <img src={imageUrl} />
          </div>
          <div className="col-xs-16 col-md-6 right-section">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input
                type="text"
                className="form-control"
                placeholder="Title Here"
                ref={input => (this._imgTitle = input)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Description Here"
                ref={input => (this._imgDiscription = input)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Who Is The Owner of This Image?"
                ref={input => (this._imgOwner = input)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Original URL"
                ref={input => (this._imgUrl = input)}
              />
              <label>
                <input
                  type="checkbox"
                  className="featuring_checkbox"
                  value="off"
                  ref={input => (this._imgFeaturing = input)}
                />
                Featuring Image
              </label>
            </form>
            <div className="text-right">
              <button className="btn cancelBtn">Cancel</button>
              <button
                className="btn append-margin submit_button"
                onClick={this.handleSubmit.bind(this)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const ImgDetails = state;
  return { ImgDetails };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ImgDetails);
