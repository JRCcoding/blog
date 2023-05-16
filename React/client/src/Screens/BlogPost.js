import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const BlogPost = () => {
  const { isAuthenticated } = useAuth0()
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
  const deleteHandler = async () => {
    await axios
      .delete(`/api/blogposts/${id}/delete`)
      .then((response) => {
        console.log('Status: ', response.status)
        console.log('Deleted Data: ', response.data)
      })
      .catch((error) => {
        console.log('Something went wrong!', error)
      })
    navigate('/')
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
          </Link>
          <br />
          <p style={{ textIndent: '15px', wordWrap: 'break-word' }}>
            {blogpost.body}
          </p>
          {isAuthenticated && (
            <button onClick={() => deleteHandler()}>Delete</button>
          )}
        </div>
      )}
    </>
  )
}

export default BlogPost
