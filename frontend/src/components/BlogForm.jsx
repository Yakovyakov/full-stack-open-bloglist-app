import { useState, useImperativeHandle } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Box, Button, TextField, Typography } from '@mui/material'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('url')

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: newTitle.inputFields.value,
        author: newAuthor.inputFields.value,
        url: newUrl.inputFields.value
      })
    )
    newTitle.onReset()
    newAuthor.onReset()
    newUrl.onReset()
    blogFormRef.current.toggleVisibility()
  }


  return (
    <Box>
      <Typography variant='h6'>
        Create new blog
      </Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label='Title' variant="standard"
            className='titleTextBox'
            data-testid='title'
            { ...newTitle.inputFields }
          />
        </div>
        <div>
          <TextField
            label='Author' variant="standard"
            className='authorTextBox'
            data-testid='author'
            { ...newAuthor.inputFields }
          />
        </div>
        <div>
          <TextField
            label='Url' variant="standard"
            className='urlTextBox'
            data-testid='url'
            { ...newUrl.inputFields }
          />
        </div>
        <Button type="submit">create</Button>
      </form>
    </Box>
  )
}

export default BlogForm