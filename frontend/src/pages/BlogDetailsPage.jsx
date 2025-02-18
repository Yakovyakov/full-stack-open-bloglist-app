import { useSelector, shallowEqual } from 'react-redux'
import { useMatch } from 'react-router-dom'
import BlogDetails from '../components/BlogDetails'



const BlogDetailsPage = () => {
  const blogs = useSelector(state => state.blogs, shallowEqual)
  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(item => item.id === (match.params.id))
    : null

  return  (
    <div>
      <BlogDetails blog={blog}/>
    </div>
  )
}

export default BlogDetailsPage
