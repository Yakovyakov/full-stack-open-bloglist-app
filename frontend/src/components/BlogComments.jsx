import { Box, List, ListItem, Typography } from '@mui/material'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
const BlogComments = ({ blog }) => {
  if (!blog)
    return null
  const existComments = (!blog.comments || blog.comments.length === 0)? false : true
  return (
    <Box>
      { !existComments && (
        <Typography>
          No comments yet
        </Typography>
      )}
      { existComments && (
        <List>
          {blog.comments.map((comment, i) =>
            <ListItem key={i}>
              <CommentOutlinedIcon />
              {comment}</ListItem>
          )}
        </List>
      )}
    </Box>
  )
}
export default BlogComments