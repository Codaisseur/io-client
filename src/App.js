import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

function App () {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  function onMessage () {
    socket.on('message', message => {
      setMessages(messages => [...messages, message])
    })
  }

  useEffect(onMessage, [])

  function onChange (event) {
    setMessage(event.target.value)
  }

  function onSubmit (event) {
    event.preventDefault()

    socket.emit('message', message)

    setMessage('')
  }

  const items = messages.map((item, index) => (
    <li key={index}>{item}</li>
  ))

  return (
    <form onSubmit={onSubmit}>
      <ul>{items}</ul>

      <input
        type='text'
        value={message}
        onChange={onChange}
      />

      <button>Send</button>
    </form>
  )
}

export default App
