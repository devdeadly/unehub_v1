import { createReducer } from '../utils/reducer.utils'
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from '../types/async.types'

const intialState = {
  loading: false,
}

const asyncActionStarted = state => {
  return {
    ...state,
    loading: true,
  }
}

const asyncActionFinished = state => {
  return {
    ...state,
    loading: false,
  }
}

const asyncActionError = state => {
  return {
    ...state,
    loading: false,
  }
}

export default createReducer(intialState, {
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinished,
  [ASYNC_ACTION_ERROR]: asyncActionError,
})
