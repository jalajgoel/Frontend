import { ARTICLEDATA, ERROR } from '../actions/YourSpace_actions/article_actions';

const initialState = {
  articledata: '',
};

export default function fetchArticleData(state = initialState, action) {
  switch (action.type) {
    case ARTICLEDATA:
      return { articledata: action.payload };
      break;

    case ERROR:
      return { articledata: action.payload };
      break;

    default:
      return { state };
  }
}
