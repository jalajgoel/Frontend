import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import variables from '../../../../variables';
import { Redirect } from 'react-router-dom';
import DropToUpload from 'react-drop-to-upload';

class FromAnotherResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: true,
      image: false,
      description: false,
      next: 1,
      imgName:'',
      move:false
    };
  }

  submitFromRosorso() {
    console.log('hello');
  }

  handleCancel() {
    console.log('me');
  }

  next() {
    this.setState({ next: this.state.next + 1 });
  }

  pasteUrl(e) {
    e.preventDefault();
    // paste from clipboard is pending yet
  }

  getUrl(e) {
    const addressUrl = this.addressUrl.value;
    if(addressUrl==''){
      alert("Please Add Valid URL Address")
      return false;
    }
    else{
      console.log("entered Url: ", addressUrl)
      return true
    }
    
  }

  next2(e) {
    var getUrl= this.getUrl(e);
    if(!getUrl){
      return false
    }
    else{
      this.next();
      console.log("getURL", getUrl)

    }
  }

  

  submitDescription(e){
    e.preventDefault();
    var title= this.titleHere.value
    var imgDescription= this.imgDescription.value
    console.log(title, imgDescription)
  }

  getImg(e){
    e.preventDefault();
    var type=e.target.files[0]['type']
    
    if(type.split('/')[0]=='image') {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      var my= this
      reader.onload= function(e) {
        console.log("in if")
        var url= e.target.result;
        my.setState({imgName: url, move: true})
      }
      
      return true
    }
    
    else{
      alert("File Type Does Not Support. Please Choose File of Type JPEG/PNG Only")
      return false
    }
  }

  next3(e){
   
    if(this.state.move){
      this.next();
      return true
    }
    
    else{
      alert("Choose valid file..!!!")
      return false
    }
  }

  renderData() {
    if (this.state.next == 1) {
      return (
        <div>
          <form onSubmit={this.getUrl.bind(this)}>
            <input
              className="form-control"
              type="text"
              name="addressOfRelatedArticle"
              placeholder="Address of The Related Article"
              ref={(input) => {
                this.addressUrl = input;
              }}
            />
            <button onClick={this.pasteUrl.bind(this)}>paste</button>
          </form>
          <button onClick={this.next2.bind(this)}>Next</button>
        </div>
      );
    } else if (this.state.next == 2) {
      return (
        <div>
          <form>
            <input 
              type="file"
              name="files"
              accept="image/x-png,image/gif,image/jpeg" 
              onChange={this.getImg.bind(this)}/>
          </form>
          <button onClick={this.next3.bind(this)}>next in 2</button>
        </div>
      );
    } else if (this.state.next == 3) {
      return (
        <div>
          <div className="col-sm-6 text-center">
            <img src={this.state.imgName}/>
          </div>
          <div className="col-sm-6">
            <form onSubmit={this.submitDescription.bind(this)}>
              <input
                className="form-control"
                type="text"
                placeholder="Title Here"
                name="imageTitle"
                ref={(input)=> this.titleHere = input }
                />
              <input
                className="form-control"
                type="text"
                placeholder="Description Here"
                name="imgDescription"
                ref={(input)=> this.imgDescription = input }
              />
              <div className="text-right">
                <button className="btn cancelBtn">
                  Cancel
                </button>
                <input
                  type="submit"
                  name="relatedArticle_submit"
                  value="Save"
                  className="submit_button append-margin saveBtn"
                  onClick={this.submitDescription.bind(this)}
                />
              </div>
            </form>
          </div>
          
          
        </div>
      );
    }
    return false;
  }

  render() {
    const renderData = this.renderData();
    return (
      <div>
        <div className="resourceProcess text-center">
          <ul>
            <li 
              className={this.state.next==1?"colorChange":""}>
              1 Address 
            </li>
            <li><i className="ico-icon57"></i></li>
            <li 
              className={this.state.next==2?"colorChange":""}>
              2 Image 
            </li>
            <li><i className="ico-icon57"></i></li>
            <li 
              className={this.state.next==3?"colorChange":""}>
              3 Description
            </li>
          </ul>
        </div>
        <div>
          {renderData}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const fromAotherResource = state;
  return { fromAotherResource };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(FromAnotherResource);
