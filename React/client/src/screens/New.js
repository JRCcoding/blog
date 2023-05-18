import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const New = ({ history }) => {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0()
  const [submitId, setSubmitId] = useState(isAuthenticated && user.sub)
  const [submitUser, setSubmitUser] = useState(isAuthenticated && user.name)
  const [submitUserImage, setSubmitUserImage] = useState(
    isAuthenticated ? user.picture : ''
  )
  const [title, setTitle] = useState('')
  const today = new Date()
  const splitToday = JSON.stringify(today).split('-')
  const year = splitToday[0]
  const month = splitToday[1]
  const day = splitToday[2].substring(0, 2)
  const submitDate = month + '-' + day + '-' + year.substring(1, 5)
  const [date, setDate] = useState(submitDate)
  const [body, setBody] = useState('')
  const [file, setFile] = useState()
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', file)
    formData.append('description', description)

    const result = await axios.post(
      '/api/images',
      formData
      // , {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }
    )
    console.log(result.data)
    const blogEntry = {
      submitUser,
      submitUserImage,
      submitId,
      title,
      date,
      body,
      upload: result.data,
    }
    await axios.post(`/api/blogposts`, blogEntry)
    loginWithRedirect().then(navigate('/'))
  }

  return (
    <div>
      {/* {!isAuthenticated ? (
        <strong
          style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
        >
          Must be logged in to submit blog posts! <br />
          <button onClick={() => loginWithRedirect()}>Login!</button>
        </strong>
      ) : ( */}
      <Form
        onSubmit={submitHandler}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginLeft: '10%',
          marginRight: '10%',
        }}
        encType='multipart/form-data'
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title'
            style={{ width: '100%' }}
          />{' '}
        </div>
        <div>
          <textarea
            type='text'
            name='body'
            style={{ height: '50vh', width: '100%' }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='Content...'
          />
        </div>
        <input
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          accept='png jpg jpeg'
        ></input>
        <input
          onChange={(e) => setDescription(e.target.value)}
          type='text'
          required={file && true}
        ></input>
        <button type='submit'>Submit</button>
      </Form>
      {/* )} */}
    </div>
  )
}

export default New
