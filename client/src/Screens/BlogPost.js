import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const BlogPost = () => {
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
            height: '80vh',
          }}
        >
          <h1 style={{ display: 'inline' }}>{blogpost.title}</h1>
          <strong style={{ display: 'inline', float: 'right' }}>
            {blogpost.date}
          </strong>
          <img
            src={blogpost.userImage}
            alt={blogpost.user}
            style={{ height: '60px', borderRadius: '50%', float: 'right' }}
          />
          <br />
          <p style={{ textIndent: '15px' }}>{blogpost.body}</p>
          <button onClick={() => deleteHandler()}>Delete</button>
        </div>
      )}
    </>
  )
}

export default BlogPost
