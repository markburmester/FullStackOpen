import { useContext, useEffect } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
