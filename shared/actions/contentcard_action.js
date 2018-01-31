import 'fetch-everywhere';
import store from '../redux/configureStore';
import variables from '../../variables';

export const CONTENT = 'CONTENT';
export const ERROR = 'ERROR';

// sending received response from backed to reducer
export function contentCardSuccess(res) {
  return {
    type: CONTENT,
    payload: res,
  };
}

// to hndle error
export function contentCardError(err) {
  return {
    type: ERROR,
    message: err,
  };
}

// sorting content cards acc to likes, trends
export function getContentCard(likeFilter, trendFilter, pageno) {
  let url = '';
  if (likeFilter == false && trendFilter == true) {
    url = `${variables.url.liveURL}/api/articles/trending/`;
  } else if (likeFilter == true && trendFilter == false) {
    url = `${variables.url.liveURL}/api/articles/likes/`;
  } else if (likeFilter == true && trendFilter == true) {
    url = `${variables.url.liveURL}/api/articles/both/`;
  } else {
    url = `${variables.url.liveURL}/api/articles/latest/`;
  }
  return (dispatch, state) =>
    fetch(url + pageno, {
      method: 'get',
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          const content = res.content;
          return dispatch(contentCardSuccess(content));
        }
        return dispatch(contentCardError(res));
      })
      .catch(error => dispatch(contentCardError(error)));
}

// receiving content data for quickCategories from backend
export function getCategoryFilter_Data(categoryFilter) {
  return (dispatch, state) =>
    fetch(`${variables.url.liveURL}/api/${categoryFilter}/1`, {
      method: 'get',
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          const data = res.content;
          return dispatch(contentCardSuccess(data));
        }
        return dispatch(contentCardError(res));
      })
      .catch(error => dispatch(contentCardError(error)));
}

// receiving content data for dropdown
export function getTypeFilter(filter, likeFilter, trendFilter) {
  let url = '';
  if (filter && likeFilter == false && trendFilter == true) {
    url = `${variables.url.liveURL}/api/articles/trending/${filter}/`;
  } else if (filter && likeFilter == true && trendFilter == false) {
    url = `${variables.url.liveURL}/api/articles/likes/${filter}/`;
  } else if (filter && likeFilter == true && trendFilter == true) {
    url = `${variables.url.liveURL}/api/articles/both/${filter}/`;
  } else {
    url = `${variables.url.liveURL}/api/articles/latest/${filter}/`;
  }
  return (dispatch, state) =>
    fetch(`${url}1`, {
      method: 'get',
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          const filtered_data = res.content;
          return dispatch(contentCardSuccess(filtered_data));
        }
        return dispatch(contentCardError(res));
      })
      .catch(error => dispatch(contentCardError(error)));
}
