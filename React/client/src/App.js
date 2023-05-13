import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import BlogPost from './Screens/BlogPost'
import New from './Screens/New'
import PublicProfile from './Screens/PublicProfile'
import Profile from './Screens/Profile'
import About from './Screens/About'
import Home from './Screens/Home'

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
            <li>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' className='nav-link'>
                About
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to='/new' className='nav-link'>
                    New Post
                  </Link>
                </li>
                {/* <li>
                  <Link to='/profile'>
                    <img
                      src={user.picture}
                      alt={user.name}
                      // style={{
                      //   height: '55px',
                      //   width: '55px',
                      //   borderRadius: '50%',
                      //   position: 'absolute',
                      //   right: '5%',
                      //   top: '0',
                      // }}
                    />
                  </Link>
                </li> */}
                <li>
                  <Link
                    className='nav-link'
                    style={{
                      scale: '85%',
                      color: 'darkred',
                      position: 'absolute',
                      right: '12%',
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
              </>
            ) : (
              <li>
                <Link
                  className='nav-link'
                  style={{
                    color: 'darkgreen',
                    fontWeight: 'bold',
                    position: 'absolute',
                    right: '12%',
                  }}
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path='/blogpost/:id' element={<BlogPost />} />
          <Route path='/new' element={<New />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/:id' element={<PublicProfile />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} exact />
        </Routes>
      </div>
    </Router>
  )
}

export default App
