/**
 * This function exists to remove the massive switch statements that come about when
 * creating reducers to usual way. This function is called once on application startup
 * when it registers the initial state and all of the handlers - an action type (string)
 * and an associated action creator
 *
 * refer to https://redux.js.org/recipes/reducing-boilerplate#generating-reducers
 * @param {*} initialState e.g. { data: 42 }
 * @param {*} handlers e.g. { INCREMENT_COUNTER: func, DECREMENT_COUNTER: func }
 */
export const createReducer = (initialState, handlers) => {
  /**
   * the params of the reducer function below represent anything we dispatch
   * @param {*} state
   * @param {*} action
   */
  const reducer = (state = initialState, action) => {
    console.log('state', state)
    console.log('action', action)
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action) // action might not be a necessary argument for the action creator
    } else {
      return state
    }
  }
  return reducer
}
