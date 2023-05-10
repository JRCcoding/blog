import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { createBlogpost } from '../Actions/blogActions'

const New = ({ history }) => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0()
  const [submitUser, setSubmitUser] = useState(
    isAuthenticated ? user.name : 'Anonymous'
  )
  const [submitUserImage, setSubmitUserImage] = useState(
    isAuthenticated ? user.picture : ''
  )
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [body, setBody] = useState('')

  const submitHandler = async () => {
    await axios.post(`/api/blogposts`, {
      submitUser,
      submitUserImage,
      title,
      date,
      body,
    })
    loginWithRedirect()
  }
  return (
    <div>
      {!isAuthenticated ? (
        <strong>
          Must be logged in to submit blog posts! <br />
          <button onClick={() => loginWithRedirect()}>Login!</button>
        </strong>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Label>Date:</Form.Label>
          <textarea
            type='text'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <Form.Label>Title:</Form.Label>
          <textarea
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <Form.Label>Content:</Form.Label>
          <textarea
            type='text'
            name='body'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <br />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </div>
  )
}

export default New
