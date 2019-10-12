import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../types/test.types'
import { createReducer } from '../utils/reducer.utils'

const initialState = {
  data: 42,
  name: 'colby',
}

const incrementCounter = state => {
  return { ...state, data: state.data + 1 }
}

const decrementCounter = state => {
  return { ...state, data: state.data + 1 }
}

export default createReducer(initialState, {
  [INCREMENT_COUNTER]: incrementCounter,
  [DECREMENT_COUNTER]: decrementCounter,
})
