import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRules } from 'actions/questions'
import { Link } from 'react-router'
import _ from 'lodash'
import Helmet from 'react-helmet'
var Collapse = require('rc-collapse');
var Panel = Collapse.Panel;

class Intro extends Component {
  render() {
    return (
      <div>
        <h1>Risorso</h1>          
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Intro)
