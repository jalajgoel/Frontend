import { CONTENT, ERROR } from '../actions/contentcard_action';

const initialState = {
  result: [],
};

// receiving action response
export default function viewContentCard(state = initialState, action) {
  switch (action.type) {
    case 'CONTENT':
      return {
        result: action.payload,
      };
    case 'ERROR':
      return {
        result: action.message,
      };
    default:
      return state;
  }
}
