// import { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');
// socket.on('connect', () => {
//   console.log(`You connected with id: ${socket.id}`)
// })



const Messages = () => {
  // const [message, setMessage] = useState('');
  // const [messageData, setMessageData] = useState('');

  // const handleChange = (e: any) => {
  //   setMessage(e.target.value);
  // } 

  // const handleSubmit = () => {
  //   socket.emit('send-message', message);


  // }

  // useEffect(() => {
  //   socket.on('receive-messsage', message => {
  //     setMessageData(message)
  //   })
  // }, [handleSubmit])



  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <input 
          value={message}
          onChange={handleChange}
        />
        <button type='submit'>Send Message</button>
      </form>
      <h1>{messageData}</h1> */}
    </div>
  )
}

export default Messages