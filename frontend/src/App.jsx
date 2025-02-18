/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes, Route, Link,
  useMatch,
  Navigate,
  useNavigate
} from 'react-router-dom'
import { Container } from '@mui/material'
import { getAllBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/authUserReducer'
import { createNotification } from './reducers/notificationReducer'
import { getAllUsers } from './reducers/userReducer'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Footer from './components/Footer'

import './index.css'
import BlogsPage from './pages/BlogsPage'
import UsersPage from './pages/UsersPage'
import UserDetailsPage from './pages/UserDatailsPage'
import BlogDetailsPage from './pages/BlogDetailsPage'
import ResponsiveAppBar from './components/ResponsiveAppBar'






const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(initializeUser())
  }, [])
  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllUsers())
  }, [])



  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(createNotification(`Bye ${ user.name === undefined ? user.username : user.name }`))
    dispatch(logoutUser())
  }
  const loginForm = () => {
    return (
      <div>
        <LoginForm/>
      </div>
    )
  }
  const padding = {
    padding: 5
  }
  console.log('user ', user)
  return(

    <Container>
      <div>
        <div>
          <div>
            <ResponsiveAppBar />
          </div>
          <Notification />
          { !user && loginForm() }
          { user &&
          <Routes>
            <Route path='/' element={<BlogsPage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/users/:id' element={<UserDetailsPage />} />
            <Route path='/blogs/:id' element={<BlogDetailsPage />} />
            <Route path='/*' element={<h3>404 Page Not Found</h3>} />
          </Routes>
          }
        </div>


        <Footer />
      </div>
    </Container>
  )
}

export default App