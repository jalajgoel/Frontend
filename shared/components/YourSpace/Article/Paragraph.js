import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class Paragraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditParagraph: false,
      paragraph: '',
      previousParagraph: '',
      localData: [],
      callProp: this.props.callRender,
    };
  }

  /*
    Function handleOpenParagraph(e) is used to maintain the stability for editting mode of component.
  */
  handleOpenParagraph(e) {
    const value = this.props.value;
    this.setState({
      paragraph: value,
      showEditParagraph: true,
    });
  }

  /*
    Function submitParagraph(e) is used to handle the submit action of paragraph when clicked on save.
  */
  submitParagraph(e) {
    e.preventDefault();
    const paragraph = this.state.paragraph;
    if (paragraph == '') {
      alert("Field can't be empty. Delete instead");
      return false;
    }
    this.setState({
      showEditParagraph: !this.state.showEditParagraph,
    });

    /* Check if there is any data in localStorage or not if not will make a new localStorage */
    if (JSON.parse(localStorage.getItem('article_data')) == null) {
      var newData = [
        {
          id: this.props.ID,
          rank: this.props.rank,
          type: 'paragraph',
          content: paragraph,
        },
      ];
      localStorage.setItem('article_data', JSON.stringify(newData));
    } else {
      /* Check if there is any data in localStorage or not if yes will check for update the entry or append new */
      let check = false;
      const localData = JSON.parse(localStorage.getItem('article_data'));

      /* Mapping for updation */
      const mapping = localData.map((data) => {
        /* Condition for update if the clicked id or id in localstorage match */
        if (e.target.id == data.id) {
          data.id = data.id;
          data.rank = 3;
          data.type = 'paragraph';
          data.content = paragraph;
          check = true;
        }
      });

      /* If id matches in above condition then check will be true and new array of localData will be updated */
      if (check) {
        localStorage.setItem('article_data', JSON.stringify(localData));
      } else {
        /* If id not match then it will make append a new entry in the localStorage */
        this.state.callProp();
        let temp = {};
        temp = localData;
        var newData = {
          id: this.props.ID,
          rank: 3,
          type: 'paragraph',
          content: paragraph,
        };
        temp.push(newData);
        localStorage.setItem('article_data', JSON.stringify(temp));
      }
    }
    this.state.callProp();
  }

  /*
    Function handleParagraphInput(e) is used to maintaining data when an input fiels is changes.
  */
  handleParagraphInput(e) {
    this.setState({ paragraph: e.target.value });
  }

  /*
    Function handleCancel() is used to main the stability of edit mode when cancel button is clicked.
  */
  handleCancel() {
    this.setState({
      showEditParagraph: !this.state.showEditParagraph,
    });
  }

  /*
    Function formData() contains the html for editable form.
  */
  formData() {
    return (
      <form onSubmit={this.submitParagraph.bind(this)} className="no-drag drag-event">
        <div className="form-group no-drag drag-event">
          <textarea
            id={this.props.ID}
            autoFocus
            value={this.state.paragraph ? this.state.paragraph : ''}
            onChange={this.handleParagraphInput.bind(this)}
            className="form-control mainInp no-drag drag-event"
            name="paragraph"
            placeholder="Discription...."
          />
        </div>
        <div className="text-right no-drag drag-event">
          <button
            id={this.props.ID}
            className="btn cancelBtn no-drag drag-event"
            onClick={this.handleCancel.bind(this)}
          >
            Cancel
          </button>
          <input
            id={this.props.ID}
            type="submit"
            name="AboutUs_submit"
            value="Save"
            className="submit_button append-margin saveBtn no-drag drag-event"
            onClick={this.submitParagraph.bind(this)}
          />
        </div>
      </form>
    );
  }

  /*
    Function pData() contains the html for non editable mode.
  */
  pData() {
    return (
      <p className="no-drag drag-event">
        {this.props.value}
      </p>
    );
  }

  /*
    Function openParagraph() used make the component editable or non-editable.
  */
  openParagraph() {
    let formData = this.formData(),
      pData = this.pData();

    if (this.props.open || this.state.showEditParagraph) {
      return formData;
    }
    return pData;
  }

  render() {
    const openParagraphForm = this.openParagraph();
    return (
      <div>
        <div
          className="parentSection no-drag drag-event"
          data-rank={this.props.rank}
          id={this.props.ID}
        >
          <div className="childSection1 sub-header no-drag drag-event">
            <h6 className="no-drag drag-event">Paragraph</h6>
            <ul className="text-muted pull-right no-drag drag-event">
              <li>
                <img
                  className="no-drag drag-event"
                  id={this.props.ID}
                  src="../assets/images/user-profile/article-icon-1.png"
                  onClick={this.handleOpenParagraph.bind(this)}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                />
                <span className="disabled no-drag drag-event">&nbsp;</span>
              </li>
              <li>
                <img
                  className="no-drag drag-event"
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
                  className="no-drag drag-event"
                  id={this.props.ID}
                  src="../assets/images/user-profile/article-icon-3.png"
                  onMouseDown={this.props.removeNoDrag}
                  onMouseUp={this.props.addNoDrag}
                  onClick={this.handleOpenParagraph.bind(this)}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Drag"
                />
              </li>
            </ul>
          </div>
          <div className="childsection2 no-drag drag-event">
            {openParagraphForm}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const Paragraph = state;
  return { Paragraph };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Paragraph);
