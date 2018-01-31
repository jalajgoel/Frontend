import { LOGIN, ERROR, FORGETPASSWORD } from '../actions/login_action';

const initialState = {
  response: '',
};

// receiving response sent by action according to type of action
export default function fetchLogin(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { response: action.payload };
      break;

    case 'ERROR':
      return { response: action.payload };
      break;

    case 'FORGETPASSWORD':
      return { response: action.payload };
      break;

    default:
      return state;
  }
}
