import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import variables from '../../../../variables';
import { Redirect } from 'react-router-dom';

class Separator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callProp: this.props.callRender,
    };
  }

  saveSeperator(e) {
    console.log('open');
    const localData = JSON.parse(localStorage.getItem('article_data'));
    if (localData == null) {
      var newData = [
        {
          id: this.props.ID,
          rank: this.props.rank,
          type: 'seperator',
          content: 'image',
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
          data.rank = data.rank;
          data.type = 'seperator';
          data.content = 'image';
          check = true;
        }
      });

      /* If id matches in above condition then check will be true and new array of localData will be updated */
      if (check) {
        localStorage.setItem('article_data', JSON.stringify(localData));
      } else {
        this.state.callProp();
        let temp = {};
        temp = localData;
        var newData = {
          id: this.props.ID,
          rank: this.props.rank,
          type: 'seperator',
          content: 'seperator',
        };
        temp.push(newData);
        localStorage.setItem('article_data', JSON.stringify(temp));
      }
    }
    this.state.callProp();
  }

  render() {
    return (
      <div className="parentSection">
        <div className="childSection1 sub-header text-center">
          <h6>Separator</h6>
          <img src="../assets/images/separator.png" alt="separator" />
          <ul className="text-muted pull-right">
            <li>
              <img
                id={this.props.ID}
                src="../assets/images/user-profile/article-icon-2.png"
                onClick={this.props.delete}
              />
            </li>
            <li>
              <img src="../assets/images/user-profile/article-icon-3.png" />
            </li>
          </ul>
          <div className="text-right">
            <input
              type="submit"
              value="Save"
              id={this.props.ID}
              className="submit_button append-margin saveBtn"
              onClick={this.saveSeperator.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const separator = state;
  return { separator };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Separator);
