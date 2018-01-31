import { REQUEST,
         SUCCESS,
        ERROR
      } from '../actions/YourSpace_actions/channel_action';

const initialState = {
  result: [],
  loading: false,
  error: null,
  success: false,
  message:''
};

export default function fetchChannelData(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST':
      return { ...state, loading: true };
      break;

    case 'ERROR':
      return { ...state, loading: false, error: true, message: action.message };
      break;

    case 'SUCCESS':
      return { result: action.payload };  

    default:
      return state;
  }
}
