import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import BlogCommentForm from './BlogCommentForm'
import BlogComments from './BlogComments'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'

const BlogDetails = ({ blog }) => {
  const userAuth = useSelector(state => state.user, shallowEqual)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  if (!blog)
    return null
  const nameOfUser = blog.user ? ( blog.user.name || blog.user.username ): 'anonymous'

  const canRemove = blog.user ? blog.user.username === userAuth.username : true


  const handleLikes = () => {
    const updateBlogObject = {
      ...blog,
      user: blog.user.id,
    }
    dispatch(likeBlog(updateBlogObject))

  }
  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if ( ok ) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }
  return (
    <Box>
      <Typography
        component="div"
        variant="h3"
        sx={{ color: 'text.primary' }}
      >
        {blog.title}
      </Typography>
      <Typography
        component="div"
        variant="body2"
        sx={{ color: 'text.secondary', mb: 2 }}
      >
                      by {blog.author}
      </Typography>
      <Box>
        <Typography
          component="a"
          href={blog.url}
          variant="body1"
          sx={{ color: 'text.primary' }}
        >
          {blog.url}
        </Typography>
        <Box>
          <Typography
            component='span'
            variant="body1"
          >
            {blog.likes} likes
          </Typography>
          <IconButton aria-label="like" onClick={handleLikes}>
            <ThumbUpIcon />
          </IconButton>
        </Box>
        <Typography
          component='div'
        >
          added by { ! blog.user ? nameOfUser :
            <Link to={`/users/${blog.user.id}`}>{ nameOfUser }</Link>
          }
        </Typography>
        { canRemove && (
          <IconButton aria-label="remove" onClick={handleRemove}>
            <DeleteIcon />
            remove blog
          </IconButton>

        )}
      </Box>
      <div>
        <Typography
          component='div'
          variant='h4'
        >
          comments
        </Typography>
        <BlogCommentForm blog={blog}/>
        <BlogComments blog={blog}/>
      </div>
    </Box>
  )
}
export default BlogDetails