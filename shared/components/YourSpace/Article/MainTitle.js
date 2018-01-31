import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import variables from '../../../../variables';
import { Redirect } from 'react-router-dom';

class MainTitle extends Component {
  constructor() {
    super();
    this.state = {
      showEditMainTitle: false,
      mainTitle: '',
      localData: '',
    };
  }

  componentDidMount() {
    const fetchData = JSON.parse(localStorage.getItem('mainTitle'));
    if (fetchData !== '') {
      this.setState({
        localData: fetchData,
        mainTitle: fetchData,
      });
    }
  }

  // handler to open edit maintitle form
  handleOpenMainTitle() {
    this.setState({ showEditMainTitle: !this.state.showEditMainTitle });
  }

  // handler to handle input to update state value
  handleMainTitleInput(e) {
    this.setState({ mainTitle: e.target.value });
  }

  // handler to cancel edit main title
  handleCancel() {
    console.log(this.state.previousMainTitle);
    this.setState({
      showEditMainTitle: !this.state.showEditMainTitle,
      mainTitle: this.state.localData,
    });
  }

  grapCookieValue() {
    const cookies = new Cookies();
    const token_val = cookies.get('risorsoLoggedIn');
    return token_val;
  }

  // handler to submit edit form
  submitMainTitleForm(e) {
    e.preventDefault();
    const mainTitle = this.state.mainTitle;
    if (mainTitle == '') {
      alert('Article must have a Title!!');
      return false;
    }
    this.setState({
      mainTitle,
      localData: mainTitle,
      showEditMainTitle: !this.state.showEditMainTitle,
    });
    const token_val = this.grapCookieValue();
    // calling action here
    localStorage.setItem('mainTitle', JSON.stringify(mainTitle));
  }

  // display html acc to state value
  openMainTitleForm() {
    if (this.state.showEditMainTitle) {
      return (
        <form onSubmit={this.submitMainTitleForm.bind(this)}>
          <div className="form-group">
            <textarea
              autoFocus
              value={this.state.mainTitle ? this.state.mainTitle : ''}
              onChange={this.handleMainTitleInput.bind(this)}
              type="text"
              className="form-control mainInp"
              name="mainTitle"
              placeholder="Main Title..."
            />
          </div>
          <div className="text-right">
            <button className="btn cancelBtn" onClick={this.handleCancel.bind(this)}>
              Cancel
            </button>
            <input
              type="submit"
              name="AboutUs_submit"
              value="Save"
              className="submit_button append-margin"
              onClick={this.submitMainTitleForm.bind(this)}
            />
          </div>
        </form>
      );
    }
    return (
      <p>
        {this.state.localData}
      </p>
    );
  }
  render() {
    const openMainTitleForm = this.openMainTitleForm();
    return (
      <div className="parentSection">
        <div className="childSection1 sub-header">
          <h6>Main Title <span> * </span></h6>
          <ul className="text-muted pull-right">
            <li>
              <img
                src="../assets/images/user-profile/article-icon-1.png"
                onClick={this.handleOpenMainTitle.bind(this)}
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              />
            </li>
          </ul>
        </div>
        <div className="childsection2">
          {openMainTitleForm}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const MainTitle = state;
  return { MainTitle };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(MainTitle);
