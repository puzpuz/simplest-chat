import { 
  LOGIN,
  LOGOUT,
  REG_DEVICE_TOKEN
} from '../actions/types';

const INITIAL_STATE = {
  isLogin: false,
  user:{},
  deviceToken: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REG_DEVICE_TOKEN: 
      return { ...state, deviceToken: action.payload.token }
    case LOGIN:
      return { ...state, isLogin: true, user: action.payload.user };
    case LOGOUT:
      return { ... state, INITIAL_STATE }
    default:
      return state;
  }
}