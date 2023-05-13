import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [blogposts, setBlogposts] = useState()
  useEffect(() => {
    const fetchBlogposts = async () => {
      const { data } = await axios.get('/api/blogposts')

      setBlogposts(data)
    }
    fetchBlogposts()
  }, [])
  return (
    <div className='main-container'>
      <h2>Latest Submissions:</h2>
      {blogposts &&
        blogposts.map((blogpost) => (
          <Link
            to={`/blogpost/${blogpost._id}`}
            className='nav-link'
            key={blogpost.title}
          >
            <div>
              <h5>{blogpost.date}</h5>
              <h4 style={{ display: 'inline' }}>{blogpost.title}</h4>
              <div
                style={{
                  display: 'inline',
                  // position: 'absolute',
                  // right: '7%',
                  float: 'right',
                }}
              >
                <img
                  src={blogpost.submitUserImage}
                  alt={blogpost.submitUser}
                  style={{ height: '60px', borderRadius: '50%' }}
                />
              </div>

              <h6>{blogpost.body.substring(0, 100)}...</h6>
              <hr />
            </div>
          </Link>
        ))}
    </div>
  )
}

export default Home
