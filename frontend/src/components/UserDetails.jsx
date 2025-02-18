import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const UserDetails = ({ user }) => {
  if (!user) {
    return null
  }
  const name = user.name || user.username
  return (
    <Box>
      <Typography variant='h3'>
        { user.name || user.username }
      </Typography>
      <Typography variant='h4'>
        added blogs
      </Typography>
      {
        user.blogs &&
        <List>
          {user.blogs.map(blog =>
            <ListItem key={blog.id} alignItems="flex-start">
              <ListItemText
                primary={<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>}
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      by {blog.author}
                    </Typography>
                  </Fragment>}
              >

              </ListItemText>
            </ListItem>
          )}
        </List>
      }

    </Box>
  )
}

export default UserDetails