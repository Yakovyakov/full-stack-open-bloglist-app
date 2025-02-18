import { useSelector,  shallowEqual } from 'react-redux'
import { useMatch } from 'react-router-dom'
import UserDetails from '../components/UserDetails'

const UserDetailsPage = () => {
  const users = useSelector(state => state.users, shallowEqual)
  const match = useMatch('/users/:id')
  const user = match
    ? users.find(item => item.id === (match.params.id))
    : null

  return (
    <div>
      <UserDetails user={user} />
    </div>
  )
}

export default UserDetailsPage