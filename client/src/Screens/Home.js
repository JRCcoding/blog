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
  })
  return (
    <div style={{ margin: '7%' }}>
      <h2>Latest Submissions:</h2>
      {blogposts &&
        blogposts.reverse().map((blogpost) => (
          <Link to={`/blogpost/${blogpost._id}`} className='nav-link'>
            <div key={blogpost.title}>
              <h4>{blogpost.date}</h4>
              <h4 style={{ display: 'inline' }}>{blogpost.title}</h4>
              <h4
                style={{
                  display: 'inline',
                  // position: 'absolute',
                  // right: '7%',
                  float: 'right',
                }}
              >
                <img
                  src={blogpost.userImage}
                  alt={blogpost.user}
                  style={{ height: '60px' }}
                />
                {blogpost.user}
              </h4>

              <h6>{blogpost.body.substring(0, 50)}...</h6>
              <hr />
            </div>
          </Link>
        ))}
    </div>
  )
}

export default Home
