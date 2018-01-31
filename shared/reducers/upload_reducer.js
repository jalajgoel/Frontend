import { UPLOAD, REQUEST, ERROR } from '../actions/upload_action';

const initialstate = {
  loading: false,
  success: false,
  error: null,
  message: '',
  result: [],
};

export default function viewUpload(state = initialstate, action) {
  switch (action.type) {
    case 'UPLOAD':
      return {
        ...state,
        loading: false,
        success: true,
        result: action.payload,
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: true,
        message: action.message,
      };
    case 'REQUEST':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
