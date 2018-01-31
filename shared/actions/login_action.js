export const LOGIN = 'LOGIN';
export const FORGETPASSWORD = 'FORGETPASSWORD';
export const ERROR = 'ERROR';
import variables from '../../variables';

const apiURL = variables.url.localURL;
// sending received response from backend to reducer function
export function handleLogin(res) {
  return {
    type: LOGIN,
    payload: res,
  };
}

// to handle error recieved
export function handleLoginError(err) {
  return {
    type: ERROR,
    message: err,
  };
}

// sending post request to backend for login request
export function fetchLogin(email, password) {
  const res = {
    email,
    password,
  };
  const url = `${apiURL}/api/login`;
  return (dispatch, state) =>
    fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json , text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(res),
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          return dispatch(handleLogin(res));
        }
        return dispatch(handleLoginError(res));
      })
      .catch(err => dispatch(handleLoginError(res)));
}

// sending forgetpassword data to reducer
export function handleForgetPassword(res) {
  return {
    type: FORGETPASSWORD,
    payload: res,
  };
}

// sending post request to handle forget password request
export function fetchForgetPassword(email) {
  const res = {
    email,
  };
  return (dispatch, state) =>
    fetch(`${apiURL}/api/forgot_password`, {
      method: 'post',
      headers: {
        Accept: 'application/json , text/plain, */*',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(res),
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          return dispatch(handleForgetPassword(res));
        }
        return dispatch(handleLoginError(res));
      })
      .catch(err => dispatch(handleLoginError(res)));
}
