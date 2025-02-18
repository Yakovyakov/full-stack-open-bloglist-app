import { useRef } from 'react'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import BlogList from '../components/BlogList'
import { Container, Typography } from '@mui/material'
const BlogsPage = () => {
  const blogFormRef = useRef()
  return (
    <Container>
      <Typography variant='h3'>
        Blogs
      </Typography>
      <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList/>
    </Container>
  )


}
export default BlogsPage