import { createSlice } from '@reduxjs/toolkit'


import loginService from '../services/login'
import storage from '../services/storage'
import { createErrorNotification, createNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      state = action.payload
      return state
    },
    clearUser: (state) => {
      state = null
      return state
    },
  },
})

export const initializeUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser()
    if (user) {
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      dispatch(setUser(user))
      storage.saveUser(user)
      dispatch(createNotification(`${ user.name === undefined ? user.username : user.name } loggin successfully`))
    } catch (err) {
      dispatch(createErrorNotification(`${err.response?.data?.error === undefined ? err.message : err.response.data.error}`))
    }
  }
}


export const { setUser, clearUser } = userSlice.actions

export const logoutUser = () => {
  return async (dispatch) => {
    storage.removeUser()
    dispatch(clearUser())
  }
}


export default userSlice.reducer
