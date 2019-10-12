import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../types/test.types'
import { ASYNC_ACTION_START } from '../types/async.types'
import { asyncActionFinish } from './async.actions'

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER,
  }
}

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER,
  }
}

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const incrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name })
    await delay(1000)
    dispatch(incrementCounter())
    dispatch(asyncActionFinish())
  }
}

export const decrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name })
    await delay(1000)
    dispatch(decrementCounter())
    dispatch(asyncActionFinish())
  }
}
