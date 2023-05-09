import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Profile from './Screens/Profile'
import About from './Screens/About'
import Home from './Screens/Home'
import { useAuth0 } from '@auth0/auth0-react'

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
              paddingLeft: '0',
              marginTop: '0',
              listStyle: 'none',
              justifyContent: 'center',
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
                  <Link to='/profile' className='nav-link'>
                    {user.name}
                  </Link>
                </li>
                <li>
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'black',
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
                <Link className='nav-link' onClick={() => loginWithRedirect()}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} exact />
        </Routes>
      </div>
    </Router>
  )
}

export default App
