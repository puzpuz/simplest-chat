import { combineReducers } from 'redux';
import NavigationReducers from './navigation';
import AuthenticationReducers from './AuthenticationReducers';
import storage from 'redux-persist/lib/storage';
const appReducer = combineReducers({
  NavigationReducers,
  AuthenticationReducers,
});

const rootReducer = (state, action) => {
  if(action.type === 'LOGOUT') {
    storage.removeItem('persist:root');
    state = undefined
  }
  return appReducer(state, action);
}

export default rootReducer;