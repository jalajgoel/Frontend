import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditQuote: false,
      quote: '',
      previousQuote: '',
      localData: [],
      callProp: this.props.callRender,
    };
  }

  /*
    Function handleOpenQuote(e) is used to maintain the stability for editting mode of component.
  */
  handleOpenQuote(e) {
    const value = this.props.value;
    this.setState({
      showEditQuote: true,
      quote: value,
    });
  }

  /*
    Function submitQuote(e) is used to handle the submit action of paragraph when clicked on save.
  */
  submitQuote(e) {
    e.preventDefault();
    const quote = this.state.quote;
    if (quote == '') {
      alert("Field can't be empty. Delete instead");
      return false;
    }
    this.setState({
      showEditQuote: !this.state.showEditQuote,
    });

    /* Check if there is any data in localStorage or not if not will make a new localStorage */
    if (JSON.parse(localStorage.getItem('article_data')) == null) {
      var newData = [
        {
          content: quote,
          type: 'quote',
          id: this.props.ID,
          rank: this.props.rank,
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
          data.content = quote;
          data.type = 'quote';
          data.id = data.id;
          data.rank = 3;
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
          content: quote,
          type: 'quote',
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
    Function handleQuoteInput(e) is used to maintaining data when an input fiels is changes.
  */
  handleQuoteInput(e) {
    this.setState({ quote: e.target.value });
  }

  /*
    Function handleCancel() is used to main the stability of edit mode when cancel button is clicked.
  */
  handleCancel() {
    this.setState({
      showEditQuote: !this.state.showEditQuote,
    });
  }

  /*
    Function formData() contains the html for editable form.
  */
  formData() {
    return (
      <form onSubmit={this.submitQuote.bind(this)}>
        <div className="form-group">
          <textarea
            id={this.props.ID}
            autoFocus
            value={this.state.quote ? this.state.quote : ''}
            onChange={this.handleQuoteInput.bind(this)}
            className="form-control mainInp"
            name="quote"
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
            onClick={this.submitQuote.bind(this)}
          />
        </div>
      </form>
    );
  }

  /*
    Function pData() contains the html for non editable mode.
  */
  quoteData() {
    return (
      <p>
        {this.props.value}
      </p>
    );
  }

  /*
    Function openParagraph() used make the component editable or non-editable.
  */
  openQuote() {
    let formData = this.formData(),
      quoteData = this.quoteData();

    if (this.props.open || this.state.showEditQuote) {
      return formData;
    }
    return quoteData;
  }

  render() {
    const openQuoteForm = this.openQuote();
    return (
      <div className="parentSection" id={this.props.ID}>
        <div className="childSection1 sub-header">
          <h6>Quote</h6>
          <ul className="text-muted pull-right">
            <li>
              <img
                id={this.props.ID}
                src="../assets/images/user-profile/article-icon-1.png"
                onClick={this.handleOpenQuote.bind(this)}
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
          {openQuoteForm}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const quote = state;
  return { quote };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Quote);
