import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class SubTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditSubTitle: false,
      subtitle: '',
      previousSubTitle: '',
      localData: [],
      callProp: this.props.callRender,
    };
  }

  /*
    Function handleOpenSubTitle(e) is used to maintain the stability for editting mode of component.
  */
  handleOpenSubTitle(e) {
    const value = this.props.value;
    this.setState({
      subtitle: value,
      showEditSubTitle: true,
    });
  }

  /*
    Function submitSubtitle(e) is used to handle the submit action of paragraph when clicked on save.
  */
  submitSubtitle(e) {
    e.preventDefault();
    const subtitle = this.state.subtitle;
    if (subtitle == '') {
      alert("Field can't be empty. Delete instead");
      return false;
    }
    this.setState({
      showEditSubTitle: !this.state.showEditSubTitle,
    });

    if (JSON.parse(localStorage.getItem('article_data')) == null) {
      var newData = [
        {
          content: subtitle,
          type: 'subtitle',
          id: this.props.ID,
          rank: this.props.rank,
        },
      ];
      localStorage.setItem('article_data', JSON.stringify(newData));
    } else {
      let check = false;
      const localData = JSON.parse(localStorage.getItem('article_data'));
      // console.log("localData 1",localData)
      const mapping = localData.map((data) => {
        if (e.target.id == data.id) {
          data.content = subtitle;
          data.type = 'subtitle';
          data.id = data.id;
          data.rank = 3;
          check = true;
        }
      });
      if (check) {
        localStorage.setItem('article_data', JSON.stringify(localData));
      } else {
        this.state.callProp();
        let temp = {};
        temp = localData;
        var newData = {
          content: subtitle,
          type: 'subtitle',
          id: this.props.ID,
          rank: 3,
        };
        temp.push(newData);
        localStorage.setItem('article_data', JSON.stringify(temp));
      }
    }
    this.state.callProp();
  }

  /*
    Function handleSubtitleInput(e) is used to maintaining data when an input fiels is changes.
  */
  handleSubtitleInput(e) {
    this.setState({ subtitle: e.target.value });
  }

  /*
    Function handleCancel() is used to main the stability of edit mode when cancel button is clicked.
  */
  handleCancel() {
    this.setState({
      showEditSubTitle: !this.state.showEditSubTitle,
    });
  }

  /*
    Function formData() contains the html for editable form.
  */
  formData() {
    return (
      <form onSubmit={this.submitSubtitle.bind(this)}>
        <div className="form-group">
          <textarea
            id={this.props.ID}
            autoFocus
            value={this.state.subtitle ? this.state.subtitle : ''}
            onChange={this.handleSubtitleInput.bind(this)}
            className="form-control mainInp"
            name="subtitle"
            placeholder="Discription...."
          />
        </div>
        <div className="text-right">
          <button
            id={this.props.ID}
            className="btn cancelBtn"
            onClick={this.handleCancel.bind(this)}
          >
            Cancel
          </button>
          <input
            id={this.props.ID}
            type="submit"
            name="AboutUs_submit"
            value="Save"
            className="submit_button append-margin saveBtn"
            onClick={this.submitSubtitle.bind(this)}
          />
        </div>
      </form>
    );
  }

  /*
    Function sbtleData() contains the html for non editable mode.
  */
  sbtleData() {
    return (
      <p>
        {this.props.value}
      </p>
    );
  }

  /*
    Function openSubTitle() used make the component editable or non-editable.
  */
  openSubTitle() {
    let formData = this.formData(),
      sbtleData = this.sbtleData();

    if (this.props.open || this.state.showEditSubTitle) {
      return formData;
    }
    return sbtleData;
  }

  render() {
    const openSubTitleForm = this.openSubTitle();
    return (
      <div className="parentSection" id={this.props.ID}>
        <div className="childSection1 sub-header">
          <h6>Sub Title</h6>
          <ul className="text-muted pull-right">
            <li>
              <img
                id={this.props.ID}
                src="../assets/images/user-profile/article-icon-1.png"
                onClick={this.handleOpenSubTitle.bind(this)}
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              />
            </li>
            <li>
              <img
                id={this.props.ID}
                src="../assets/images/user-profile/article-icon-2.png"
                onClick={this.props.delete}
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
              />
            </li>
            <li>
              <img
                id={this.props.ID}
                src="../assets/images/user-profile/article-icon-3.png"
                data-toggle="tooltip"
                data-placement="top"
                title="Drag"
              />
            </li>
          </ul>
        </div>
        <div className="childsection2">
          {openSubTitleForm}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const subTitle = state;
  return { subTitle };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(SubTitle);
