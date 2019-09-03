import {
  LOGIN,
  LOGOUT,
  REG_DEVICE_TOKEN
} from './types';

export const regToken = (token) => {
  return (dispatch) => {
    dispatch({
      type:REG_DEVICE_TOKEN,
      payload:  {token}
    })
  }
}

export const login = (user) => {
  return(dispatch) => {
    dispatch({
      type: LOGIN,
      payload: {user}
    });
  
  }
}

export const logout = () => {
  return(dispatch) => {
    dispatch({
      type: LOGOUT
    });
  }
}
