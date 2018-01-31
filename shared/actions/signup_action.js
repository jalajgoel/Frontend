import variables from '../../variables';

export const SIGNUP = 'SIGNUP';
export const ERROR = 'ERROR';

const apiURL = variables.url.liveURL;
// sending received response form fetchSignup to reducer
export function handleSignUp(res) {
  return {
    type: SIGNUP,
    payload: res,
  };
}

// to handle error
export function handleSignupError(err) {
  return {
    type: ERROR,
    message: err,
  };
}

// sending post request of signup data i.e. email and password to backend
export function fetchSignup(email, password) {
  const res = {
    email,
    password,
  };
  const url = `${apiURL}/api/register`;
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
          return dispatch(handleSignUp(res));
        }
        return dispatch(handleSignupError(res));
      })
      .catch(err => dispatch(handleSignupError(res)));
}
