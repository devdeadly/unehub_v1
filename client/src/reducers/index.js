// ROOT REDUCER
import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import { reducer as formReducer } from 'redux-form'
import notifyReducer from 'react-redux-notify'
export default combineReducers({
  alert,
  auth,
  form: formReducer,
  notifications: notifyReducer,
  profile,
})
