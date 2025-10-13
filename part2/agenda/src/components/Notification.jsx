const Notification = ({message, type}) => {
  if (message === null){
    return null
  }
  if (type === 'message'){
    return(
        <div className="message">
            {message}
        </div>
    )
   }
   else if (type === 'error'){
    return(
        <div className="error">
            {message}
        </div>
    )
   }
  
   
} 

export default Notification