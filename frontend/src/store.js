import { configureStore } from '@reduxjs/toolkit'


//import anecdoteReducer from './reducers/anecdoteReducer'
//import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authUserReducer from './reducers/authUserReducer'
import userReducer from './reducers/userReducer'
const store = configureStore({
  reducer: {
    //anecdotes: anecdoteReducer,
    //    filter: filterReducer,
    notification: notificationReducer,
    blogs: blogReducer,
    user: authUserReducer,
    users: userReducer
  }
})
export default store
