import { useDispatch } from 'react-redux'
import { useField } from '../hooks/index'
import { addComment } from '../reducers/blogReducer'
import { Box, Button, TextField } from '@mui/material'
const BlogCommentForm = ({ blog }) => {

  const dispatch = useDispatch()
  const comment = useField('text')
  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(
      addComment(blog.id, comment.inputFields.value)
    )
    comment.onReset()
  }
  if (!blog)
    return null
  return (
    <Box>
      <form onSubmit={handleAddComment}>
        <TextField
          label='Add comment ...' variant="standard"
          { ...comment.inputFields } />
        <Button type="submit">add comment</Button>
      </form>
    </Box>
  )

}

export default BlogCommentForm