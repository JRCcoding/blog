import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const BlogPost = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0()
  const [blogpost, setBlogpost] = useState()
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchBlogposts = async () => {
      const { data } = await axios.get(`/api/blogposts/${id}`)
      setBlogpost(data)
    }
    fetchBlogposts()
  }, [])

  const deleteImage = async () => {
    try {
      // Send an HTTP DELETE request to the server-side endpoint
      const response = await axios.delete(`/api/images/delete`, {
        params: {
          fileName: blogpost.upload.imageName, // Replace with the actual image file name
        },
      })
      console.log(response.data)
      response.send(response.data) // Optional: Handle the response
    } catch (error) {
      console.error(error)
    }
  }

  const deleteHandler = async () => {
    await axios
      .delete(`/api/blogposts/${id}/delete`)
      .then((response) => {
        console.log('Status: ', response.status)
        console.log('Deleted Data: ', response.data)
        deleteImage()
        loginWithRedirect()
      })
      .catch((error) => {
        console.log('Something went wrong!', error)
      })
  }

  return (
    <>
      {blogpost && (
        <div
          className='main-container'
          style={{
            marginTop: '10%',
            padding: '5%',
            border: 'solid 1px black',
            borderRadius: '5px',
            height: '80%',
          }}
        >
          <h1 style={{ display: 'inline' }}>{blogpost.title}</h1>
          <strong style={{ display: 'inline', float: 'right' }}>
            {blogpost.date}
          </strong>
          <br />
          <Link
            to={`/profile/${blogpost.submitId}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <sub>
              &nbsp;&nbsp; - by {blogpost.submitUser}
              {/* <img
                src={blogpost.submitUserImage}
                alt={blogpost.submitUser}
                style={{ height: '40px', borderRadius: '50%' }}
              /> */}
            </sub>
            <br />
          </Link>
          <br />
          <p style={{ textIndent: '15px', wordWrap: 'break-word' }}>
            {blogpost?.upload && (
              <>
                {blogpost.upload.description !== '' && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <img
                      src={`/images/${blogpost.upload?.imageName}`}
                      alt={blogpost.upload?.imageName}
                      style={{ width: '460px' }}
                    />
                    <strong style={{ width: '95%' }}>
                      <i>{blogpost.upload.description}</i>
                    </strong>
                  </div>
                )}
              </>
            )}
            {blogpost.body}
          </p>
          {user?.email === process.env.ADMIN_EMAIL && (
            <button onClick={() => deleteHandler()} style={{ float: 'right' }}>
              Delete
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default BlogPost
