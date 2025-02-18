import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setError(state, action) {
      state = {
        msg: action.payload,
        type: 'error'
      }
      return state
    },
    setInformation(state, action) {
      state = {
        msg: action.payload,
        type: 'notification'
      }

      return state

    },
    clearNotification() {
      return initialState
    },
  },
})

export const { setError, setInformation, clearNotification } = notificationSlice.actions

export const createNotification = (message, time = 5) => {
  return async (dispatch) => {
    dispatch(setInformation(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}
export const createErrorNotification = (message, time = 5) => {
  return async (dispatch) => {
    dispatch(setError(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer