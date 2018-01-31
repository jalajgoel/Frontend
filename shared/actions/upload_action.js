import store from '../redux/configureStore';
import 'fetch-everywhere';
import variables from '../../variables';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const UPLOAD = 'UPLOAD';
export const REQUEST = 'REQUEST';
export const ERROR = 'ERROR';

const apiURL = variables.url.localURL;

function uploadSuccess(res) {
  return {
    type: UPLOAD,
    payload: res,
  };
}

function uploadRequest() {
  return {
    type: REQUEST,
  };
}

function uploadError(err) {
  return {
    type: ERROR,
    message: err,
  };
}

export function imgUpload(path, token_val) {
  return (dispatch, state) => {
    dispatch(uploadRequest());
    dispatch(showLoading());

    fetch(`${apiURL}/api/upload/profilePicture`, {
      method: 'put',
      headers: {
        Accept: 'application/json, text/plain, multipart/formdata, *',
        Authorization: `Bearer ${token_val}`,
        enctype: 'multipart/formdata',
      },
      body: path,
    })
      .then((res) => {
        if (typeof res === 'object') {
          console.log('res', res);
          dispatch(hideLoading());
          return dispatch(uploadSuccess(res));
        }
        console.log('err', res);
        return dispatch(uploadError(res));
      })
      .catch(error => dispatch(uploadError(error)));
  };
}

export function multipleImage(data) {
  return (dispatch, state) => {
    fetch(`${apiURL}/api/upload/profilePicture`, {
      method: 'put',
      headers: {
        Accept: 'application/json, text/plain, multipart/formdata, *',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNjZkNjI2N2NhNDBkMjQzYzc4NWIwOCIsImlhdCI6MTUxNjg2MTE3MCwiZXhwIjoxNTE2OTQ3NTcwfQ.URgHjSWspTej0Ycgxfym9TynbGFd5OkbKnFj9n9YSmE',
        enctype: 'multipart/formdata',
      },
      body: data,
    })
      .then((res) => {
        if (typeof res === 'object') {
          console.log('res', res);
          dispatch(hideLoading());
          return dispatch(uploadSuccess(res));
        }
        console.log('err', res);
        return dispatch(uploadError(res));
      })
      .catch(error => dispatch(uploadError(error)));
  };
}
