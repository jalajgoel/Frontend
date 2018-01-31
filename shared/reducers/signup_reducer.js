import { SIGNUP, ERROR } from '../actions/signup_action';

const initialState = {
  response: '',
};

// receiving action response

export default function fetchSignUp(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP':
      return {
        response: action.payload,
      };
      break;
    case 'ERROR':
      return {
        response: action.payload,
      };
    default:
      return state;
  }
}
