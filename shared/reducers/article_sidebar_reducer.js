import { ARTICLE_SIDEBAR } from '../actions/YourSpace_actions/article_sidebar_action';

const initialState = {
  article_sidebar: '',
};

export default function fetchArticleSidebar(state = initialState, action) {
  switch (action.type) {
    case 'ARTICLE_SIDEBAR':
      return { article_sidebar: action.payload };
      break;

    default:
      return { state };
  }
}
