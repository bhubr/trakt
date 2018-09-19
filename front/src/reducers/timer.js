import {
  CREATE_TIME_SLICE_REQUEST,
  CREATE_TIME_SLICE_SUCCESS,
  CREATE_TIME_SLICE_FAILURE,
  TIMER_STARTED,
  TIMER_TICK
} from '../actions'

import {
  TIMER_IDLE,
  TIMER_POMODORO,
  TIMER_SHORT_BREAK,
  TIMER_LONG_BREAK
} from '../constants'


const initialState = {
  loading: false,
  status: TIMER_IDLE,
  interval: null,
  remaining: 0,
  startedAt: 0,
  taskId: 0,
  timerSliceId: 0
}

const timerReducer = (state = initialState, action) => {
  switch(action.type) {

    case CREATE_TIME_SLICE_REQUEST: {
      return { ...state, loading: true }
    }

    case CREATE_TIME_SLICE_SUCCESS: {
      const { taskId, timerSliceId } = action.timeSlice
      return { ...state, taskId, timerSliceId, status: TIMER_POMODORO, loading: false }
    }

    case TIMER_STARTED: {
      const { startedAt,interval } = action
      return { ...state, startedAt, interval }
    }

    case TIMER_TICK: {
      const { timestamp } = action
      console.log(state.startedAt)
      console.log(timestamp)
      const remaining = 120 - (timestamp - state.startedAt)
      return { ...state, remaining }
    }

    default: {
      return state
    }
  }
}
export default timerReducer
