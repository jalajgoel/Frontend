import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Sidebar from './Sidebar/Sidebar';
import MainTitle from './MainTitle';
import ContentDescription from './ContentDescription';
import Category from './Category';
import Channel from './Channel';
import Subtitle from './SubTitle';
import Paragraph from './Paragraph';
import Quote from './Quote';
import Separator from './Separator';
import Photo from './Photo';
import DragSortableList from 'react-drag-sortable';
import Header from './Header';
import RelatedArticle from './RelatedArticle';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addParagraph: [],
      addSubTitle: [],
      addPhoto: [],
      count: 0,
      addQuote: [],
      addSeparator: [],
      localData: [],
      open: false,
      paragraph: [],
      addRelatedArticle: [],
    };
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('article_data'));
    if (localData) {
      if (localData.length > 0) {
        let check = 0;
        localData.map((data) => {
          check++;
          this.setState({ count: check });
        });
      }
    }
    if (localData !== '') {
      this.setState({
        localData: this.state.localData.concat(localData),
        paragraph: this.state.localData.concat(localData),
      });
    }
  }

  addParagraph() {
    const count = this.state.count++;
    this.setState({
      open: true,
    });
    console.log('count', count);
    const newParahraph = this.state.addParagraph.concat({
      id: count,
      type: 'paragraph',
    });

    this.setState({
      addParagraph: newParahraph,
    });
  }

  addSubTitle() {
    const count = this.state.count++;
    this.setState({ open: true });
    const newSubtitle = this.state.addSubTitle.concat({
      id: count,
      type: 'subtitle',
    });
    this.setState({ addSubTitle: newSubtitle });
  }

  addPhoto() {
    const count = this.state.count++;
    this.setState({ open: true });
    const newPhoto = this.state.addPhoto.concat({
      id: count,
      type: 'photo',
    });
    this.setState({
      addPhoto: newPhoto,
    });
  }

  addQuote() {
    const count = this.state.count++;
    this.setState({ open: true });
    const newQuote = this.state.addQuote.concat({
      id: count,
      type: 'quote',
    });
    this.setState({ addQuote: newQuote });
  }

  addSeparator() {
    const count = this.state.count++;
    this.setState({ open: true });
    const newSeperator = this.state.addSeparator.concat({
      id: count,
      type: 'seperator',
    });
    this.setState({
      addSeparator: newSeperator,
    });
  }

  addRelatedArticle(e) {
    this.setState({ count: this.state.count + 1 });
    this.setState({
      addRelatedArticle: this.state.addRelatedArticle.concat({
        id: this.state.count,
        type: 'relatedArticle',
      }),
    });
  }

  delete(e) {
    const id = e.target.id;
    const test = JSON.parse(localStorage.getItem('article_data'));
    if (test != null) {
      const check = false;
      const deleted = test.filter(data => id != data.id);
      localStorage.setItem('article_data', JSON.stringify(deleted));
      this.callRender();
    } else {
      const deleted = this.state.addParagraph.filter((data) => {
        console.log(data);
        return id != data.id;
      });
      this.setState({
        addParagraph: deleted,
      });
    }
  }

  removeNoDrag(e) {
    console.log('removeNoDrag clicked');
    const drag = document.getElementsByClassName('no-drag');
    while (drag.length) {
      // console.log(drag.length)
      drag[0].classList.add('dragevent');
      drag[0].classList.remove('no-drag');
    }
  }

  addNoDrag(e) {
    console.log('addNoDrag');
    const dragevent = document.getElementsByClassName('dragevent');
    console.log('addNoDrag', dragevent.length);
    while (dragevent.length) {
      dragevent[0].classList.add('no-drag');
      dragevent[0].classList.remove('dragevent');
    }
  }

  /*
    Function onSort(sortedList, dropEvent) is used when a user drags or drop some component.
  */
  onSort(sortedList, dropEvent) {}

  /*
    Function callRender() is used for re-rendering all data of localStorage to other components for stability.
  */
  callRender() {
    this.setState({
      addParagraph: [],
      addSubTitle: [],
      addQuote: [],
      addSeparator: [],
      addPhoto: [],
    });
    const localData = JSON.parse(localStorage.getItem('article_data'));
    if (localData !== '') {
      this.setState({
        localData,
      });
    }
  }

  render() {
    const article_elements = [];
    const list = [];

    /* Check if there is any data in localStorage if yes it will display it in the article. */
    if (this.state.localData[0]) {
      if (this.state.localData.length > 0) {
        this.state.localData.map((data) => {
          if (data.type == 'paragraph') {
            list.push({
              content: (
                <Paragraph
                  key={data.id}
                  ID={data.id}
                  rank={data.id}
                  delete={this.delete.bind(this)}
                  addNoDrag={this.addNoDrag.bind(this)}
                  removeNoDrag={this.removeNoDrag.bind(this)}
                  list={list}
                  type={data.type}
                  value={data.content}
                  callRender={this.callRender.bind(this)}
                  open={false}
                />
              ),
            });
          } else if (data.type == 'subtitle') {
            list.push({
              content: (
                <Subtitle
                  key={data.id}
                  ID={data.id}
                  rank={data.id}
                  delete={this.delete.bind(this)}
                  list={list}
                  type={data.type}
                  value={data.content}
                  callRender={this.callRender.bind(this)}
                  open={false}
                />
              ),
            });
          } else if (data.type == 'quote') {
            list.push({
              content: (
                <Quote
                  key={data.id}
                  ID={data.id}
                  rank={data.id}
                  delete={this.delete.bind(this)}
                  list={list}
                  type={data.type}
                  value={data.content}
                  callRender={this.callRender.bind(this)}
                  open={false}
                />
              ),
            });
          } else if (data.type == 'seperator') {
            list.push({
              content: (
                <Separator
                  key={data.id}
                  ID={data.id}
                  rank={data.id}
                  delete={this.delete.bind(this)}
                  list={list}
                  type={data.type}
                  value={data.content}
                  callRender={this.callRender.bind(this)}
                  open={false}
                />
              ),
            });
          } else if (data.type == 'photo') {
            list.push({
              content: (
                <Photo
                  key={data.id}
                  ID={data.id}
                  rank={data.id}
                  delete={this.delete.bind(this)}
                  list={list}
                  type={data.type}
                  value={data.content}
                  callRender={this.callRender.bind(this)}
                  open={false}
                />
              ),
            });
          }
        });
      }
    }

    /* Check if new Component is to be added */
    if (this.state.addParagraph.length > 0) {
      const lastElement = this.state.addParagraph.slice(-1)[0];
      list.push({
        content: (
          <Paragraph
            key={this.state.count}
            ID={this.state.count}
            delete={this.delete.bind(this)}
            addNoDrag={this.addNoDrag.bind(this)}
            removeNoDrag={this.removeNoDrag.bind(this)}
            list={list}
            type="paragraph"
            rank={this.state.count}
            callRender={this.callRender.bind(this)}
            open
          />
        ),
      });
    }

    /* Check if new Component is to be added */
    if (this.state.addSubTitle.length > 0) {
      const lastElement = this.state.addSubTitle.slice(-1)[0];
      list.push({
        content: (
          <Subtitle
            key={this.state.count}
            ID={this.state.count}
            delete={this.delete.bind(this)}
            list={list}
            type="subtitle"
            rank={this.state.count}
            callRender={this.callRender.bind(this)}
            open
          />
        ),
      });
    }

    /* Check if new Component is to be added */
    if (this.state.addQuote.length > 0) {
      const lastElement = this.state.addQuote.slice(-1)[0];
      list.push({
        content: (
          <Quote
            key={this.state.count}
            ID={this.state.count}
            delete={this.delete.bind(this)}
            list={list}
            type="quote"
            rank={this.state.count}
            callRender={this.callRender.bind(this)}
            open
          />
        ),
      });
    }

    /* Check if new Component is to be added */
    if (this.state.addSeparator.length > 0) {
      const lastElement = this.state.addSeparator.slice(-1)[0];
      list.push({
        content: (
          <Separator
            key={this.state.count}
            ID={this.state.count}
            delete={this.delete.bind(this)}
            list={list}
            type="seperator"
            rank={this.state.count}
            callRender={this.callRender.bind(this)}
            open
          />
        ),
      });
    }

    /* Check if new Component is to be added */
    if (this.state.addPhoto.length > 0) {
      const lastElement = this.state.addPhoto.slice(-1)[0];
      list.push({
        content: (
          <Photo
            key={this.state.count}
            ID={this.state.count}
            delete={this.delete.bind(this)}
            list={list}
            type="Photo"
            rank={this.state.count}
            callRender={this.callRender.bind(this)}
            open
          />
        ),
      });
    }

    this.state.addRelatedArticle.map((quote, id) =>
      list.push({
        content: (
          <RelatedArticle
            key={id}
            ID={this.state.addRelatedArticle}
            delete={this.delete.bind(this)}
          />
        ),
      }),
    );

    const placeholder = <div className="placeholderContent">Drop Here!!!</div>;
    return (
      <div className="container">
        <div className="row">
          <div className="userprofile-sidebar">
            <Sidebar
              addParagraph={this.addParagraph.bind(this)}
              addSubTitle={this.addSubTitle.bind(this)}
              addPhoto={this.addPhoto.bind(this)}
              addQuote={this.addQuote.bind(this)}
              addSeparator={this.addSeparator.bind(this)}
              addRelatedArticle={this.addRelatedArticle.bind(this)}
            />
          </div>
          <div className="userprofile-main">
            <Header />
            <MainTitle />
            <Channel />
            <Category />
            <ContentDescription />
            <DragSortableList
              items={list}
              placeholder={placeholder}
              onSort={this.onSort.bind(this)}
              type="vertical"
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const Article = state;
  return { Article };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
