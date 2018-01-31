import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getAboutUs, editAboutUs, editNameSurname } from '../../../actions/userProfile_action';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import variables from '../../../../variables';
import ProfileSidebar from './Sidebar/ProfileSidebar';

// import { Draggable, Droppable } from 'react-drag-and-drop'-- not working
// import {FileDrop} from "react-file-drop"; not working
// import DropToUpload from 'react-drop-to-upload'; not working
import DropToUpload from 'react-drop-to-upload';

const apiURL = variables.url.liveURL;

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      showAboutUs: false,
      about_data: '',
      name: '',
      surname: '',
      showNameSurname: false,
      showProfilePic: false,
      profilePicture: '',
      coverPicture: '',
      scroll: false,
      // file drag n drop
      // active: 0,
      // drops: [],
    };

    // profile image upload event binders
    // this.handleDrop = this.handleDrop.bind(this);
    // this.handleDropArrayBuffer = this.handleDropArrayBuffer.bind(this);
    // this.handleDropDataURI = this.handleDropDataURI.bind(this);
    // this.handleLeave = this.handleLeave.bind(this);
    // this.handleOver = this.handleOver.bind(this);
  }

  // for profile pic upload
  // handleDrop(files) {
  //   console.log(files);
  //   console.log(arguments);
  //   const data = new FormData();

  //   files.forEach((file, index) => {
  //     data.append(`file${index}`, file[0]);
  //     console.log(file.name);
  //   });
  //   this.setState({
  //     active: 0,
  //     drops: this.state.drops.slice().concat(
  //       files.map(file => ({
  //         type: 'File',
  //         name: file.name,
  //         size: file.size,
  //       })),
  //     ),
  //   });
  // }

  // handleDropArrayBuffer(arrayBuffers, files) {
  //   console.log('dropArrayBuffer');
  //   console.log(arguments);

  //   this.setState({
  //     active: 0,
  //     drops: this.state.drops.slice().concat(
  //       files.map((file, index) => ({
  //         type: 'ArrayBuffer',
  //         name: file.name,
  //         size: file.size,
  //         md5: SparkMD5.ArrayBuffer.hash(arrayBuffers[index]),
  //       })),
  //     ),
  //   });
  // }

  // handleDropDataURI(dataURIs, files) {
  //   console.log('dropDataURI');
  //   console.log(dataURIs);
  //   const profile_picture = dataURIs;
  // const cookies = new Cookies();
  // const token_val = cookies.get('risorsoLoggedIn');
  //   const data = new FormData(dataURIs);
  //   data.append('file', file);
  //   console.log(data);
  // fetch('http://192.168.20.127:4000/api/upload/profilePicture', {
  //   method: 'put',
  //   headers: {
  //     Accept: 'application/json, text/plain, *',
  //     'Content-type': 'multipart/form-data',
  //     Authorization: `Bearer ${token_val}`,
  //   },
  //   body: JSON.stringify(profile_picture),
  // });

  //   this.setState({
  //     active: 0,
  //     drops: this.state.drops.slice().concat(
  //       files.map(file => ({
  //         type: 'Data URI',
  //         name: file.name,
  //         size: file.size,
  //       })),
  //     ),
  //   });
  // }

  // handleLeave() {
  //   this.setState({ active: 0 });
  // }

  // handleOver() {
  //   this.setState({ active: 1 });
  // }
  // profile pic upload ends

  componentWillMount() {
    const cookies = new Cookies();
    const token_val = cookies.get('risorsoLoggedIn');
    // to get user profile data when profile displayed
    this.props.getAboutUs(token_val);

    // this.props.getNameSurname(token_val);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scroll.bind(this));
  }
  componentWillReceiveProps(nextProps) {
    // to receive prop from redux store
    let about,
      name,
      surname,
      profilePicture;
    console.log('nextprops', nextProps);
    // null check..will load props data if props has some data to display
    if (nextProps.aboutusdata.fetchUserProfile.response) {
      if (nextProps.aboutusdata.fetchUserProfile.response.profile.length > 0) {
        about = nextProps.aboutusdata.fetchUserProfile.response.profile[0].about;
        name = nextProps.aboutusdata.fetchUserProfile.response.profile[0].name;
        surname = nextProps.aboutusdata.fetchUserProfile.response.profile[0].surname;
        profilePicture =
          nextProps.aboutusdata.fetchUserProfile.response.profile['0'].profile_picture;
        console.log(profilePicture);
        // console.log(about)
        this.setState({
          about_data: about,
          name,
          surname,
          profilePicture,
        });
      }
    }
  }
  // About Us starts

  // aboutus form to edit. if 'edit' clicked form to update aboutus will displayed
  // else span which shows data which is already in database.
  openAboutUsForm() {
    if (this.state.showAboutUs) {
      return (
        <form onSubmit={this.submitAboutUs.bind(this)}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="5"
              name="aboutus"
              value={this.state.about_data}
              onChange={this.aboutusInput.bind(this)}
            />
          </div>
          <div className="text-right">
            <input
              type="submit"
              name="AboutUs_submit"
              value="Save"
              className="submit_button append-margin"
              onClick={this.submitAboutUs.bind(this)}
            />
          </div>
        </form>
      );
    }
    return (
      <span className="text-muted">
        {this.state.about_data}
      </span>
    );
  }

  // handler of aboutus input
  aboutusInput(e) {
    this.setState({ about_data: e.target.value });
  }

  // handler for display hide aboutus form
  handleOpenAboutUsForm() {
    this.setState({ showAboutUs: !this.state.showAboutUs });
  }
  // handler to submit aboutus form
  submitAboutUs(e) {
    e.preventDefault();
    const editaboutdata = this.state.about_data;
    console.log('about', editaboutdata);
    const cookies = new Cookies();
    const token_val = cookies.get('risorsoLoggedIn');
    console.log(token_val);
    this.props.editAboutUs(token_val, editaboutdata);
    this.setState({ showAboutUs: !this.state.showAboutUs });
  }
  // About Us ends

  // name surname starts
  handleOpenUserNameForm() {
    this.setState({ showNameSurname: !this.state.showNameSurname });
  }

  handleNameInput(e) {
    this.setState({ name: e.target.value });
  }

  handleSurnameInput(e) {
    this.setState({ surname: e.target.value });
  }
  submitNameSurnameForm(e) {
    e.preventDefault();
    console.log('name ', this.state.name, 'surname ', this.state.surname);
    const cookies = new Cookies();
    const token_val = cookies.get('risorsoLoggedIn');
    const name = this.state.name;
    const surname = this.state.surname;
    this.props.editNameSurname(token_val, name, surname);
    this.setState({ showNameSurname: !this.state.showNameSurname });
  }

  openNameSurnameForm() {
    if (this.state.showNameSurname) {
      return (
        <form>
          <div className="form-group nameinput">
            <input
              value={this.state.name}
              onChange={this.handleNameInput.bind(this)}
              type="text"
              className="form-control"
              name="name"
            />
          </div>
          <div className="form-group nameinput">
            <input
              value={this.state.surname}
              onChange={this.handleSurnameInput.bind(this)}
              type="text"
              className="form-control"
              name="surname"
            />
          </div>
          <div className="text-right nameinputSave">
            <input
              type="submit"
              name="AboutUs_submit"
              value="Save"
              className="submit_button append-margin "
              onClick={this.submitNameSurnameForm.bind(this)}
            />
          </div>
        </form>
      );
    }
    return (
      <div>
        <div className="firstname">
          {this.state.name}
        </div>
        <div className="lastname">
          {this.state.surname}
        </div>
      </div>
    );
  }
  // name surname ends

  // profile picture starts here
  handleOpenProfilePicForm() {
    this.setState({ showProfilePic: !this.state.showProfilePic });
  }

  openProfilePicForm() {
    const url = `${apiURL}/`;
    if (this.state.showProfilePic) {
      return <div>drag/drp/select in progress</div>;
    }
    return (
      <div className="profile-img">
        <img src="../assets/images/user-profile/Profile-pic.png" alt="profile pic" />
      </div>
    );
  }

  // profile picture ends

  // cover picture starts
  handleOpenCoverPicForm() {
    this.setState({ coverPicture: !this.state.coverPicture });
  }

  openCoverPicForm() {
    if (this.state.coverPicture) {
      return <div>edit cover picture working...</div>;
    }
    return <img src="../assets/images/banner2.jpg" alt="cover photo" />;
  }
  // cover picture ends

  // to restrict display of profile ..if user not loggedin
  checkUserStatus() {
    const cookies = new Cookies();
    const a = cookies.get('risorsoLoggedIn');
    if (a) {
      return false;
    }
    return true;
  }

  // Function To add class when sidebar is fix
  scroll() {
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
  handleClick() {
    const a = document.getElementsByClassName('userprofile-data');
    // a.classList.add("active");
    console.log(a);
  }

  render() {
    const redirect = this.checkUserStatus();
    const url = apiURL;
    // if (redirect) {
    //   return <Redirect to="/login" />;
    // }

    let openAboutUsForm;
    openAboutUsForm = this.openAboutUsForm();
    let openNameSurnameForm;
    openNameSurnameForm = this.openNameSurnameForm();
    let openProfilePicForm;
    openProfilePicForm = this.openProfilePicForm();
    let openCoverPicForm;
    openCoverPicForm = this.openCoverPicForm();
    return (
      <div className="container">
        <div className="row">
          <div className={this.state.scroll ? 'userprofile-sidebar scroll' : 'userprofile-sidebar'}>
            <ProfileSidebar />
          </div>
          <div className={this.state.scroll ? 'userprofile-main scroll' : 'userprofile-main'}>
            <div className="profile_top_bar">
              <ul className="top_list">
                <li>
                  <span className="img_parent img_Bank" />Bank Accounts
                </li>
                <li>
                  <span className="img_parent img_Credit" />Credit Cards
                </li>
                <li>
                  <span className="img_parent img_Account" />Account Settings
                </li>
                <li>
                  <span className="img_parent img_Privacy" />Privacy
                </li>
                <li>
                  <span className="img_parent img_user_Profile" />user Profile
                </li>
              </ul>
            </div>

            {/* about section }
            <div className="outer-section">
              <div className="title-section">
                <span>About Us</span>
                <img
                  src="../assets/images/Edit.png"
                  className="pull-right edit-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                  onClick={this.handleOpenAboutUsForm.bind(this)}
                />
              </div>
              <div className="data-section">
                <div>
                  {openAboutUsForm}
                </div>
              </div>
            </div>
            {/* about section ends */}

            {/* profile picture starts */}
            <div className="profile-picture append-margin">
              <div className="picture-title">
                <span>Profile Picture</span>
                <img
                  src="../assets/images/Edit.png"
                  className="pull-right edit-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                  onClick={this.handleOpenProfilePicForm.bind(this)}
                />
              </div>
              <div>
                {openProfilePicForm}
              </div>
            </div>
            {/* profile picture ends */}

            {/* Name surname starts */}
            <div className="outer-section append-margin name-surname">
              <div className="title-section">
                <span>Name Surname</span>
                <img
                  src="../assets/images/Edit.png"
                  className="pull-right edit-icon"
                  onClick={this.handleOpenUserNameForm.bind(this)}
                />
              </div>
              <div className="data-section">
                {openNameSurnameForm}
              </div>
            </div>
            {/* Name surname ends */}

            {/* Cover picture starts */}
            <div className="cover-pic outer-section append-margin">
              <div className="title-section">
                <span>Cover Picture</span>
                <img
                  src="../assets/images/Edit.png"
                  className="pull-right edit-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                  onClick={this.handleOpenCoverPicForm.bind(this)}
                />
              </div>
              <div className="data-section">
                <div>
                  {openCoverPicForm}
                </div>
              </div>
            </div>
            {/* Cover picture ends */}

            {/* social network connection starts */}
            <div className="outer-section">
              <div className="title-section">
                <span>Social Network Connections</span>
                <img
                  src="../assets/images/Edit.png"
                  className="pull-right edit-icon"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                />
              </div>
              <div className="data-section">
                <div className="social-network-connections">
                  <div className="fb-connection">
                    <span className="user-social-icons text-muted">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </span>
                    <p className="socialnet-name">
                      Facebook<span>/risorso</span>
                    </p>
                    <button className="submit_button pull-right">Disconnect</button>
                  </div>
                  <div className="fb-connection">
                    <span className="user-social-icons text-muted">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </span>
                    <p className="socialnet-name">
                      Twitter/<span>risorso</span>
                    </p>
                    <button className="submit_button pull-right">Disconnect</button>
                  </div>
                  <div className="fb-connection">
                    <span className="user-social-icons text-muted">
                      <i className="fa fa-google-plus" aria-hidden="true" />
                    </span>
                    <p className="socialnet-name">
                      Google Plus/<span>risorso</span>
                    </p>
                    <button className="submit_button pull-right">Disconnect</button>
                  </div>
                  <div className="fb-connection">
                    <span className="user-social-icons text-muted">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </span>
                    <p className="socialnet-name">
                      LinkedIn/<span>risorso</span>
                    </p>
                    <button className="submit_button pull-right">Disconnect</button>
                  </div>
                </div>
              </div>
            </div>
            {/* social network connection ends */}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const aboutusdata = state;
  return { aboutusdata };
}

function mapDispatchToProps(dispatch, props) {
  return {
    getAboutUs: (token_val) => {
      dispatch(getAboutUs(token_val));
    },
    editAboutUs: (token_val, editaboutdata) => {
      dispatch(editAboutUs(token_val, editaboutdata));
    },
    editNameSurname: (token_val, name, surname) => {
      dispatch(editNameSurname(token_val, name, surname));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
