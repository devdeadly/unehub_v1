import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RIDER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  rider: {
    name: '',
    email: '',
    avatar: '',
  },
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RIDER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        rider: payload,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        rider: {},
        isAuthenticated: false,
        loading: false,
      }
    default:
      return state
  }
}
