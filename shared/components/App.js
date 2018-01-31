import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Helmet from 'react-helmet';
import Content from './Content';
import Header from './Header';
import ParentLogin from './ParentLogin';
import PreviewArticle from './YourSpace/PreviewArticle';
import config from '../../config';
// import UserProfile from './userProfile/UserProfile';
// import Article from './article/Article';

import YourSpace from './YourSpace/YourSpace';
import Article from './YourSpace/Article/Article';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showLayoutOf4: false,
      showLayoutOf3: true,
      likeSort: false,
      trendSort: true,
    };
  }

  // layout selectors
  toggleLayout3() {
    this.setState({
      showLayoutOf3: true,
      showLayoutOf4: false,
    });
  }
  toggleLayout4() {
    this.setState({
      showLayoutOf3: false,
      showLayoutOf4: true,
    });
  }

  // content sorting options
  toggleLikeSort() {
    this.setState({
      likeSort: !this.state.likeSort,
    });
  }

  toggleTrendSort() {
    this.setState({ trendSort: !this.state.trendSort });
  }

  render() {
    return (
      <div id="row">
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="application-name" content={config('htmlPage.defaultTitle')} />
          <meta name="description" content={config('htmlPage.description')} />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="msapplication-TileColor" content="#2b2b2b" />
          <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
          <meta name="theme-color" content="#2b2b2b" />
          <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
          <link href="../assets/css/main.css" rel="stylesheet" />
          <link href="../assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css?family=Oxygen:300,400,700"
            rel="stylesheet"
          />
          <title>
            {config('htmlPage.defaultTitle')}{' '}
          </title>
        </Helmet>
        <Header
          layout3={this.toggleLayout3.bind(this)}
          layout4={this.toggleLayout4.bind(this)}
          likesort={this.toggleLikeSort.bind(this)}
          trendingsort={this.toggleTrendSort.bind(this)}
        />

        <div className="container content no_padding">
          <div className="col-xs-12 no_padding">
            <div className="row no_margin">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props =>
                    (<Content
                      component={Content}
                      layout3={this.state.showLayoutOf3}
                      layout4={this.state.showLayoutOf4}
                      likesort={this.state.likeSort}
                      trendingsort={this.state.trendSort}
                    />)}
                />
                <Route path="/login" component={ParentLogin} />
                <Route path="/yourspace" component={YourSpace} />
                <Route path="/createarticle" component={Article} />
                <Route path="/previewarticle" component={PreviewArticle} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
