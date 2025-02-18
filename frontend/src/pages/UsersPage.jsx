import { Container, Typography } from '@mui/material'
import UserList from '../components/UserList'

const UsersPage = () => {

  return (
    <Container >
      <Typography variant='h3'>
        Users
      </Typography>
      <UserList />
    </Container>
  )
}

export default UsersPage
