import { ABOUTUS, ERROR } from '../actions/userProfile_action';

const initialState = {
  response: '',
};

export default function fetchUserProfile(state = initialState, action) {
  switch (action.type) {
    case 'ABOUTUS':
      return { response: action.payload };
      break;

    case 'ERROR':
      return { response: action.message };
      break;

    default:
      return state;
  }
}
