import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import BlogPost from './screens/BlogPost'
import New from './screens/New'
import PublicProfile from './screens/PublicProfile'
import Profile from './screens/Profile'
import Home from './screens/Home'
import { FaUserCircle } from 'react-icons/fa'

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  return (
    <Router>
      <div>
        <nav>
          <ul
            style={{
              flexDirection: 'row',
              display: 'flex',
              gap: '3%',
              width: '100%',
              paddingLeft: '10%',
              paddingTop: '1%',
              paddingBottom: '1%',
              listStyle: 'none',
              backgroundColor: '#fafafa',
              borderBottom: '1px solid black',
            }}
          >
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={`/profile/${user.sub}`}>
                    {/* <img
                      src={user.picture}
                      alt={user.name}
                      style={{
                        height: '55px',
                        width: '55px',
                        borderRadius: '50%',
                        position: 'absolute',
                        right: '12%',
                        top: '0',
                      }}
                    /> */}
                    <FaUserCircle />
                  </Link>
                </li>
                <li>
                  <Link
                    className='nav-link'
                    style={{
                      fontWeight: 'bold',
                      color: 'darkred',
                    }}
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link to='/new' className='nav-link'>
                    New Post
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className='nav-link'
                  style={{
                    color: 'darkgreen',
                    fontWeight: 'bold',
                  }}
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Link>
              </li>
            )}
            <li>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/blogpost/:id' element={<BlogPost />} />
          <Route path='/new' element={<New />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:id' element={<PublicProfile />} />
          <Route path='/' element={<Home />} exact />
        </Routes>
      </div>
    </Router>
  )
}

export default App
