import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createErrorNotification, createNotification } from './notificationReducer'
import { removeBlogToUser, appendBlogToUser } from './userReducer'
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      state = state.filter((b) => b.id !== action.payload)
      return state
    },
    replaceBlog(state, action){
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
  },
})

export const { setBlogs, addBlog, removeBlog, replaceBlog } = blogSlice.actions

export const getAllBlogs = () => {
  return async (dispatch) => {
    try{
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (err) {
      dispatch(createErrorNotification(`${err.response?.data?.error === undefined ? err.message : err.response.data.error}`))
    }
    console.log('aca')
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try{
      const createdBlog = await blogService.create(newBlog)
      dispatch(addBlog(createdBlog))
      const userid = createdBlog.user.id
      const blog = {
        id: createdBlog.id,
        title: createdBlog.title,
        author: createdBlog.author,
        url: createdBlog.url
      }
      console.log(userid)
      console.log(blog)
      dispatch(appendBlogToUser({ userid: userid, blog: blog }))
      dispatch(createNotification(`a new blog ${createdBlog.title} by ${createdBlog.author}`))
    } catch (err) {
      dispatch(createErrorNotification(`${err.response?.data?.error === undefined ? err.message : err.response.data.error}`))
    }
    //dispatch(updateUserDetails(createdBlog.user))
  }
}

export const likeBlog = (object) => {
  const toLike = { ...object, likes: object.likes + 1 }
  return async (dispatch) => {
    try{
      const updatedBlog = await blogService.update(toLike)
      dispatch(replaceBlog(updatedBlog))
      dispatch(createNotification(`You liked ${updatedBlog.title} by ${updatedBlog.author}`))
    } catch (err) {
      dispatch(createErrorNotification(`${err.response?.data?.error === undefined ? err.message : err.response.data.error}`))
    }
  }
}

export const deleteBlog = (blogObject) => {
  return async (dispatch) => {
    try{
      await blogService.remove(blogObject.id)
      dispatch(removeBlog(blogObject.id))
      dispatch(removeBlogToUser({ userid: blogObject.user.id, blogid: blogObject.id }))
      dispatch(createNotification(`Blog ${blogObject.title}, by ${blogObject.author} removed`))
    } catch (err) {
      dispatch(createErrorNotification(`${err.response?.data?.error === undefined ? err.message : err.response.data.error}`))
    }
  }
}

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    try{
      console.log('comment ', comment)
      console.log('blogId ', blogId)
      const updatedBlog = await blogService.addComment(blogId, comment)
      dispatch(replaceBlog(updatedBlog))
      dispatch(createNotification(`You added comment to blog ${updatedBlog.title}`))
    } catch (err) {
      dispatch(createErrorNotification(`${err.response?.data?.error === undefined ? err.message : err.response.data.error}`))
    }
  }
}

export default blogSlice.reducer
