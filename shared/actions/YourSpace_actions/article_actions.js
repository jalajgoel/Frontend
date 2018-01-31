export const ARTICLEDATA = 'ARTICLEDATA';
export const ERROR = 'ERROR';
import variables from '../../../variables';

const apiURL = variables.url.localURL;

function articleData(res) {
  return {
    type: ARTICLEDATA,
    payload: res,
  };
}

function articleDataError(err) {
  return {
    type: ERROR,
    payload: err,
  };
}

export function fetchPreviewArticle(token, main_title, article_data, article_id) {
  console.log('local data', article_data);
  return (dispatch, state) => {
    fetch(`${apiURL}/api/articles/draft`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ main_title, article_data, article_id }),
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          console.log('res._id', res.article._id);
          return dispatch(articleData(res));
        }
        return dispatch(articleDataError(res));
      })
      .catch(err => dispatch(articleDataError(err)));
  };
}
