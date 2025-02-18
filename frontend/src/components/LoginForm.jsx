import PropTypes from 'prop-types'
import { Box, Container, TextField, Button,
  Typography } from '@mui/material'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/authUserReducer'
const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser(username.inputFields.value, password.inputFields.value))
  }

  return(
    <Container fixed>
      <Box align='center'>
        <Typography variant='h3' align='center'>Log in to application</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Username" variant="standard"
              data-testid='username'
              name="Username"
              { ...username.inputFields }
              style={{ marginLeft: 5 }}
            />
          </div>
          <div>
            <TextField
              label="Password" variant="standard"
              data-testid='password'
              name="Password"
              { ...password.inputFields }
              style={{ marginLeft: 5 }}
            />
          </div>
          <Button size='medium' type="submit">login</Button>
        </form>
      </Box>
    </Container>
  )
}
export default LoginForm