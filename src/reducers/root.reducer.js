import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'

import testReducer from './test.reducer'
import asyncReducer from './async.reducer'

/**
 * Note that each of these reducers is managing its own part of the global state.
 * The state parameter is different for every reducer, and corresponds to the part
 * of the state it manages.
 */
const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  async: asyncReducer,
})

export default rootReducer
