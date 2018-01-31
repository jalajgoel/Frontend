import React, { Component, PropTypes } from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      completed: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loading && !nextProps.completed) {
      this.setState({
        loading: true,
        completed: false,
      });
    }
    if (nextProps.completed) {
      this.setState({
        loading: true,
        completed: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // once completed, reset to no-loading state
    if (this.state.completed) {
      setTimeout(
        () => {
          this.setState(
            {
              loading: false,
              completed: false,
            },
            function () {
              this.props.resetLoading();
            },
          );
        },
        1200,
      );
    }
  }
  render() {
    console.log(this.props);
    if (this.state.loading && !this.state.completed) {
      var loadingSpeed = `slow ${this.props.inModal}`;
    } else if (this.state.completed) {
      var loadingSpeed = `fast ${this.props.inModal}`;
    } else {
      var loadingSpeed = `none ${this.props.inModal}`;
    }
    return <div id="progressBar-bar" className={loadingSpeed} />;
  }
}

module.exports = ProgressBar;
