export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
import variables from '../../../variables';

const apiURL = variables.url.localURL;

function channelDataSuccess(res) {
  return {
    type: SUCCESS,
    payload: res,
  };
}

function channelDataRequest() {
  return {
    type: REQUEST,
  };
}

function channelDataError(err) {
  return {
    type: ERROR,
    message: err,
  };
}

export function fetchChannelData(token) {
  return (dispatch, state) => {
    dispatch(channelDataRequest())
    fetch(`${apiURL}/api/channels`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          var data = res.data
          return dispatch(channelDataSuccess(data));
        }
        return dispatch(channelDataError(res));
      })
      .catch(err => dispatch(channelDataError(err)));
  };
}
