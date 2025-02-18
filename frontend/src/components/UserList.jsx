import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useSelector,  shallowEqual } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users, shallowEqual)
  console.log('UserList, ', users)
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`/users/${user.id}`}>{ user.name || user.username }</Link>
                </TableCell>
                <TableCell align='right'>{ user.blogs.length }</TableCell>

              </TableRow>

            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
export default UserList