import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification || !notification.text || notification.display === 'none') {
    return null
  }

  const notificationClass = notification.type === 'error' ? 'notification-error' : 'notification'

  return (
    <div 
      className={notificationClass}
      style={{ 
        opacity: notification.display === 'hiding' ? 0 : 1,
        transition: 'opacity 0.5s ease-out'
      }}
    >
      {notification.text}
    </div>
  )
}

export default Notification