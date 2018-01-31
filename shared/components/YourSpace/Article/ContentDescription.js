import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';

class ContentDescription extends Component {
  constructor() {
    super();
    this.state = {
      showEditContentDescription: false,
      ContentDescription: '',
      localData: '',
    };
  }

  componentDidMount() {
    const fetchData = JSON.parse(localStorage.getItem('content_description'));
    if (fetchData !== '') {
      this.setState({
        localData: fetchData,
        ContentDescription: '',
      });
    }
  }

  // handler to open edit maintitle form
  handleOpenContentDescription() {
    this.setState({ showEditContentDescription: !this.state.showEditContentDescription });
  }

  // handler to handle input to update state value
  handleContentDescription(e) {
    this.setState({ ContentDescription: e.target.value });
  }

  // handler to cancel edit main title
  handleCancel() {
    this.setState({
      showEditContentDescription: !this.state.showEditContentDescription,
      ContentDescription: this.state.localData,
    });
  }

  grapCookieValue() {
    const cookies = new Cookies();
    const token_val = cookies.get('risorsoLoggedIn');
    return token_val;
  }

  // handler to submit edit form
  submitContentForm(e) {
    e.preventDefault();
    const ContentDescription = this.state.ContentDescription;
    if (ContentDescription == '') {
      alert('Article must have a Content Description !!');
      return false;
    }
    this.setState({
      ContentDescription,
      localData: ContentDescription,
      showEditContentDescription: !this.state.showEditContentDescription,
    });
    const token_val = this.grapCookieValue();
    // calling action here
    localStorage.setItem('content_description', JSON.stringify(ContentDescription));
  }

  // display html acc to state value
  openContentForm() {
    if (this.state.showEditContentDescription) {
      return (
        <form onSubmit={this.submitContentForm.bind(this)}>
          <div className="form-group">
            <textarea
              autoFocus
              type="text"
              value={this.state.ContentDescription ? this.state.ContentDescription : ''}
              onChange={this.handleContentDescription.bind(this)}
              type="text"
              className="form-control mainInp"
              name="contentDescription"
              placeholder="Content Description"
              maxLength="230"
            />
          </div>
          <div className="text-right">
            <button className="btn cancelBtn" onClick={this.handleCancel.bind(this)}>
              Cancel
            </button>
            <input
              type="submit"
              name="Channel_submit"
              value="Save"
              className="submit_button append-margin"
              onClick={this.submitContentForm.bind(this)}
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
    const openContentForm = this.openContentForm();
    return (
      <div className="parentSection">
        <div className="childSection1 sub-header">
          <h6>Content Description <span> * </span></h6>
          <ul className="text-muted pull-right">
            <li>
              <img
                src="../assets/images/user-profile/article-icon-1.png"
                onClick={this.handleOpenContentDescription.bind(this)}
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              />
            </li>
          </ul>
        </div>
        <div className="childsection2">
          {openContentForm}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const ContentDescription = state;
  return { ContentDescription };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentDescription);
