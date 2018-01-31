export const ABOUTUS = 'ABOUTUS';
export const ERROR = 'ERROR';
import variables from '../../variables';

const apiURL = variables.url.liveURL;

export function handleAboutUs(res) {
  return {
    type: ABOUTUS,
    payload: res,
  };
}

export function handleFormError(err) {
  return {
    type: ERROR,
    message: err,
  };
}

export function getAboutUs(token_val) {
  const url = `${apiURL}/api/profile`;

  return (dispatch, state) =>
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_val}`,
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          return dispatch(handleAboutUs(res));
        }
        return dispatch(handleFormError(res));
      })
      .catch(err => dispatch(handleFormError(err)));
}

export function editAboutUs(token, editaboutdata) {
  const data = [{ propName: 'about', value: editaboutdata }];
  const url = `${apiURL}/api/profile`;
  console.log(data, 'edit about token');
  return (dispatch, state) =>
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          return dispatch(handleAboutUs(res));
        }
        return dispatch(handleFormError(res));
      })
      .catch(err => dispatch(handleFormError(err)));
}

export function editNameSurname(token, name, surname) {
  const data = [{ propName: 'name', value: name }, { propName: 'surname', value: surname }];
  const url = `${apiURL}/api/profile`;

  return (dispatch, state) =>
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          return dispatch(handleAboutUs(res));
        }
        return dispatch(handleFormError(res));
      })
      .catch(err => dispatch(handleFormError(err)));
}
