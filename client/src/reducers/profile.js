import {
  GET_RIDER,
  RIDER_ERROR,
  CLEAR_RIDER,
  UPDATE_RIDER,
  GET_RIDERS,
} from '../actions/types'

const initialState = {
  rider: null,
  riders: [],
  loading: true,
  error: {},
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_RIDER:
    case UPDATE_RIDER:
      return {
        ...state,
        rider: payload,
        loading: false,
      }
    case GET_RIDERS:
      return {
        ...state,
        riders: payload,
        loading: false,
      }
    case RIDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case CLEAR_RIDER:
      return {
        ...state,
        rider: null,
        loading: false,
      }
    default:
      return state
  }
}
