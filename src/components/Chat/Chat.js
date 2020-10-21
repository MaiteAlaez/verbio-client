import React, { useState, useEffect, useRef } from 'react'
import { MdSend } from 'react-icons/md'
import { AiFillMessage } from 'react-icons/ai'
import cx from 'classnames'
import styles from './Chat.module.scss'

import * as Routes from 'constants/Routes'
import * as MessageAuthors from 'constants/MessageAuthor'
import * as MessageTypes from 'constants/MessageTypes'
import * as api from 'utils/api'
import auth from 'utils/auth'

const Chat = ({ history }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const chatAreaRef = useRef(null)

  const handleOnLogoutClick = () => {
    auth.logout()
    history.push(`${Routes.LOGIN}`)
  }

  const handleResponseError = (error) => {
    if (error?.res?.status === 401) {
      // TODO: Change alert for a modal or something, anything nicer than an alert
      alert('Session expired, please login again')
      auth.logout()
      history.push(`${Routes.LOGIN}`)
    }
    // TODO: handle error
  }

  const handleInputValueChange = (event) => {
    setNewMessage(
      event.target.value
    )
  }

  const getWelcomeMessage = async() => {
    try {
      const res = await api.getWelcomeMessage()
      setMessages([
        ...messages,
        ...res.response.map((message) => {
          return {
            ...message,
            author: MessageAuthors.SYSTEM
          }
        })
      ])
    } catch (error) {
      handleResponseError(error)
    }
  }

  const handleSubmitMessage = async (event) => {
    event.preventDefault()
    if (!newMessage) return

    try {
      const userMessage = {
        text: newMessage,
        type: MessageTypes.TEXT,
        author: MessageAuthors.USER
      }
      const res = await api.sendMessage(userMessage)
      setMessages([
        ...messages,
        userMessage,
        ...res.response.map((message) => {
          return {
            ...message,
            author: MessageAuthors.SYSTEM
          }
        })
      ])

      setNewMessage('')
    } catch (error) {
      handleResponseError(error)
    }
  }

  useEffect(() => {
    getWelcomeMessage()
  },[])

  useEffect(() => {
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
  }, [messages])

  // TODO: use reusable input and button components
  return (
    <div className={styles.component}>
      <div className={styles.header}>Verbio Technologies</div>
      <div className={styles.area} ref={chatAreaRef}>
        {messages && messages.map((message, index) => {
          return (
            <div key={index} className={cx(styles.message, styles[`message-${message.author}`])}>
              {message.author === MessageAuthors.SYSTEM && (
                <div className={styles.messageIcon}>
                  <AiFillMessage />
                </div>
              )}
              <div className={styles.messageContent}>
                {message.type === MessageTypes.TEXT ? (
                  <span>{message.text}</span>
                ) : message.type === MessageTypes.IMAGE && (
                  <img className={styles.messageContentImage} src={message.url} />
                )}
              </div>
            </div>
          )})}
      </div>
      <form className={styles.footer} onSubmit={handleSubmitMessage}>
        <input
          id="userInput"
          className={styles.footerInput}
          name="userMessage"
          value={newMessage}
          placeholder="Type a message"
          onChange={handleInputValueChange}
        />
        <button type="submit" className={styles.footerSubmitButton}>
          <MdSend />
        </button>
        <button className={styles.footerLogoutButton} onClick={handleOnLogoutClick}>Logout</button>
      </form>
    </div>
  )
}

export default Chat
