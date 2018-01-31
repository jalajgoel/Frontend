import { combineReducers } from 'redux';
import viewquickCategories_Data from '../reducers/quickCategories_reducer';
import viewContentCard from '../reducers/contentcard_reducer';
import fetchSignUp from '../reducers/signup_reducer';
import fetchLogin from '../reducers/login_reducer';
import viewUpload from '../reducers/upload_reducer';
import fetchUserProfile from '../reducers/userprofile_reducer';
import fetchArticleData from '../reducers/article_reducer';
import fetchChannelData from '../reducers/channel_reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = combineReducers({
  viewquickCategories_Data,
  viewContentCard,
  fetchSignUp,
  fetchLogin,
  fetchUserProfile,
  fetchArticleData,
  loadingBar: loadingBarReducer,
  fetchChannelData,
});

export default rootReducer;
