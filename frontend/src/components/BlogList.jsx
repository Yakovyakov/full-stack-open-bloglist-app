/* eslint-disable indent */
import { useDispatch, useSelector,  shallowEqual } from 'react-redux'
import Blog from './Blog'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'


const BlogList = () => {
    const blogs = useSelector(({ blogs }) => {
      return [...blogs].sort((a,b) => b.likes - a.likes)
    }, shallowEqual)
    console.log('Blogs:', blogs)

    return (
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Blogs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogs.map(blog =>
                <TableRow
                  key={blog.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                      <Blog blog={blog} />
                    </TableCell>
                 </TableRow>
            )}
            </TableBody>
          </Table>
        </TableContainer>
    </Box>
    )
}

export default BlogList
