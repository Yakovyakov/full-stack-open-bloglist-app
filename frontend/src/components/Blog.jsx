import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Blog = ({
  blog,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <Box>
      <Typography
        component="div"
        variant="body1"
        sx={{ color: 'text.primary' }}
      >
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </Typography>
      <Typography
        component="div"
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        by {blog.author}
      </Typography>

    </Box>
  )
}

export default Blog
