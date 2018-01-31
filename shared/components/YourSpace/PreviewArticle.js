import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import { NavLink } from 'react-router-dom';
import { fetchPreviewArticle } from '../../actions/YourSpace_actions/article_actions';

class PreviewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainTitle: '',
      channel_data: '',
      category_data: '',
      content_description: '',
      elements: [],
      featuringUrl: ''
    };
  }

  componentDidMount() {
    const article_data = JSON.parse(localStorage.getItem('article_data'));

    const mainTitle = JSON.parse(localStorage.getItem('mainTitle')),
          channel_data = JSON.parse(localStorage.getItem('channel_data')),
          category_data = JSON.parse(localStorage.getItem('category_data')),
          content_description = JSON.parse(localStorage.getItem('content_description'));
    this.setState({
      mainTitle,
      channel_data,
      category_data,
      content_description
    });
    console.log(article_data);

    if (article_data) {
      if (article_data.length > 0) {
        const maping = article_data.map((data) => {
          if (data.type == 'paragraph') {
            return (
              <div className="paragraph paragraph-section text-center">
                <p>
                  {data.content}
                </p>
              </div>
            );
          } else if (data.type == 'subtitle') {
            return (
              <div className="subtitle subtitle-section text-center">
                <h3>
                  {data.content}
                </h3>
              </div>
            );
          } else if (data.type == 'quote') {
            return (
              <div className="quote quote-section">
                <div className="quote-heading text-center">
                  <h2>
                    {data.content}
                  </h2>
                </div>
              </div>
            );
          } else if (data.type == 'seperator') {
            return <img src="../assets/images/separator.png" className="preview_seperator" />;
          } else if (data.type == 'add') {
            return (
              <div>
                <p className="preview_subtitle">
                  add {data.content}
                </p>
              </div>
            );
          } else if (data.type == 'photo') {
              if(data.featuring == true){
                console.log('yes');
                this.setState({
                  featuringUrl: data.url
                })

              }
              else{
                console.log('no');
              }
            
          }
        });
        this.setState({
          elements: maping,
        });
        // console.log(maping);
      }
    }
  }

  saveDraft() {
    const cookies = new Cookies();
    const token = cookies.get('risorsoLoggedIn');
    const main_title = JSON.parse(localStorage.getItem('mainTitle'));
    const article_data = JSON.parse(localStorage.getItem('article_data'));
    this.props.savePreviewArticle(token, main_title, article_data);
  }

  render() {
    console.log(this.state.elements);
    return (
      <div className="container no_padding card-header">
        <div className="">
          <div className="preview_article_header">
            <div className="col-sm-6">
              <NavLink to="/createarticle">
                <button className="back-btn card-btn">Back</button>
              </NavLink>
            </div>
            <div className="col-sm-6 text-right">
              <button className="card-btn save-btn" onClick={this.saveDraft.bind(this)}>
                Save
              </button>
              <button className="card-btn publish-btn">Publish</button>
            </div>
          </div>
        </div>
        <div className="card card-section">
          <img src={this.state.featuringUrl} className="preview_seperator" />
          <div className="col-sm-12 col-md-8">
            <div className="card-left">
              <h2>
                {this.state.mainTitle}
              </h2>
              <div className="content-card-footer">
                <ul>
                  <li>
                    <i
                      className="ico-icon42 footer-icons"
                      aria-hidden="true"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Trending"
                    />
                    <span className="text-muted">0</span>
                  </li>
                  <li>
                    <i
                      className="ico-icon44 footer-icons text-muted"
                      aria-hidden="true"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Comments"
                    />
                    <span className="text-muted">0</span>
                  </li>
                  <li>
                    <i
                      className="ico-icon43 footer-icons text-muted"
                      aria-hidden="true"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Likes"
                    />
                    <span className="text-muted">0</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="card-right">
              <p>
                <span className="text-muted">0 Hours</span>
              </p>
            </div>
          </div>
        </div>
        <div className="title title-section text-center">
          <h2>
            {this.state.mainTitle}
          </h2>
        </div>
        <div className="preview text-center">
          {this.state.elements}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const PreviewArticle = state;
  return { PreviewArticle };
}

function mapDispatchToProps(dispatch, props) {
  return {
    savePreviewArticle: (token, main_title, article_data) => {
      dispatch(fetchPreviewArticle(token, main_title, article_data));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PreviewArticle);
