// import variables from '../../variables';

export const ARTICLE_SIDEBAR = 'ARTICLE_SIDEBAR';

// sending received quickcategories response to reducer
function articleSidebar_Success(res) {
  return {
    type: ARTICLE_SIDEBAR,
    payload: res,
  };
}

// to handle error
function articleSidebar_Error(err) {
  return {
    type: ERROR,
    payload: err,
  };
}

// sending request to backend for quickcategories
export function getArticleSidebar_Data(props) {
  // console.log(props.addParagraph);
  // console.log(a)
  return (dispatch, state) => {
    const a = props.addParagraph;
    const articleSidebar = [
      {
        id: 1,
        image: '../assets/images/user-profile/paragraph.png',
        category: 'Paragraph',
        // props: a
      },
      {
        id: 2,
        image: '../assets/images/user-profile/photo.png',
        category: 'Photo',
        props: '',
      },
      {
        id: 3,
        image: '../assets/images/user-profile/title.png',
        category: 'Title',
      },
      {
        id: 4,
        image: '../assets/images/user-profile/separator.png',
        category: 'Separator',
      },
      {
        id: 5,
        image: '../assets/images/user-profile/quote.png',
        category: 'Quote',
      },
      {
        id: 6,
        image: '../assets/images/user-profile/related-post.png',
        category: 'Related Post',
      },
      {
        id: 7,
        image: '../assets/images/user-profile/video.png',
        category: 'Video',
      },
      {
        id: 8,
        image: '../assets/images/user-profile/place.png',
        category: 'Place',
      },
      {
        id: 9,
        image: '../assets/images/user-profile/image-creation.png',
        category: 'Image Creation',
      },
      {
        id: 10,
        image: '../assets/images/user-profile/list.png',
        category: 'List',
      },
    ];
    return dispatch(articleSidebar_Success(articleSidebar));
  };
}
