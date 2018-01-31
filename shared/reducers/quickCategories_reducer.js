import { QUICK } from '../actions/quickCategories_action';

const initialState = {
  result: [],
};

// receiving action response
export default function viewquickCategories_Data(state = initialState, action) {
  switch (action.type) {
    case 'QUICK':
      return {
        result: action.payload,
      };
    case 'ERROR':
      return {
        result: action.payload,
      };
    default:
      return state;
  }
}
