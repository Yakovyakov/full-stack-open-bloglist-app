import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    updateUser(state, action) {
      const updatedUser = action.payload
      return state.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    },
    appendBlogToUser(state, action) {
      const blog = action.payload.blog
      const userid=action.payload.userid
      const user = state.find(user => user.id === userid)
      const userToUpdate={
        ...user,
        blogs: user.blogs.concat(blog)
      }
      userToUpdate.blogs.concat(blog)
      return state.map((user) =>
        user.id === userToUpdate.id ? userToUpdate : user
      )
    },
    removeBlogToUser(state, action) {
      const blogid = action.payload.blogid
      const userid=action.payload.userid
      const user = state.find(user => user.id === userid)
      const userToUpdate={
        ...user,
        blogs: user.blogs.filter(blog => blog.id !== blogid)
      }
      return state.map((user) =>
        user.id === userToUpdate.id ? userToUpdate : user
      )
    },

  },
})

export const { setUser, updateUser, appendBlogToUser, removeBlogToUser } = userSlice.actions

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUser(users))
  }
}


export default userSlice.reducer
