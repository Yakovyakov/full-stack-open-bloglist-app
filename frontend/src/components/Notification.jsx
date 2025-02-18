import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message === null) {
    return null
  }

  return (
    <div>
      <Alert severity={ message.type === 'error' ? 'error' : 'success' }>{message.msg}</Alert>

    </div>
  )
}

export default Notification
