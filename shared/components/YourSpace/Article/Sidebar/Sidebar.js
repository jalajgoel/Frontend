import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colored: '',
      sidebarIcons: [
        {
          id: 1,
          image: '../assets/images/user-profile/paragraph.png',
          category: 'Paragraph',
          props: this.props.addParagraph,
        },
        {
          id: 2,
          image: '../assets/images/user-profile/photo.png',
          category: 'Photo',
          props: this.props.addPhoto,
        },
        {
          id: 3,
          image: '../assets/images/user-profile/title.png',
          category: 'Title',
          props: this.props.addSubTitle,
        },
        {
          id: 4,
          image: '../assets/images/user-profile/separator.png',
          category: 'Separator',
          props: this.props.addSeparator,
        },
        {
          id: 5,
          image: '../assets/images/user-profile/quote.png',
          category: 'Quote',
          props: this.props.addQuote,
        },
        {
          id: 6,
          image: '../assets/images/user-profile/related-post.png',
          category: 'Related Post',
          props: this.props.addRelatedArticle,
        },
        {
          id: 7,
          image: '../assets/images/user-profile/video.png',
          category: 'Video',
          // props: this.props.add
        },
        {
          id: 8,
          image: '../assets/images/user-profile/place.png',
          category: 'Place',
          // props: this.props.add
        },
        {
          id: 9,
          image: '../assets/images/user-profile/image-creation.png',
          category: 'Image Creation',
          // props: this.props.add
        },
        {
          id: 10,
          image: '../assets/images/user-profile/list.png',
          category: 'List',
          // props: this.props.add
        },
      ],
    };
    // console.log(this.props)
  }

  changeColor(data) {
    this.setState({ colored: data });
    data.props();
  }

  getAricleSidebar() {
    if (this.state.sidebarIcons) {
      if (this.state.sidebarIcons.length > 0) {
        return this.state.sidebarIcons.map(data =>
          (<div
            key={data.id}
            className={this.state.colored == data ? 'userprofile-data active' : 'userprofile-data'}
            onClick={this.changeColor.bind(this, data)}
          >
            <img src={data.image} />
            <p>
              {data.category}
            </p>
          </div>),
        );
      }
    }
  }

  render() {
    const sidebar = this.getAricleSidebar();
    return (
      <div>
        <div className="userprofile-heading">ADD</div>
        {sidebar}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const article_sidebar = state;
  return { article_sidebar };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
