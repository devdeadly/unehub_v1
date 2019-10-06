// ROOT REDUCER
import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  alert,
  auth,
  form: formReducer,
  profile,
})
