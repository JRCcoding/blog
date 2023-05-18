import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider
    domain='dev-dstps3q4l34f7d23.us.auth0.com'
    clientId='2SGCWz2U2Cs96woMjSWXI488KYHSlbx1'
    authorizationParams={{
      redirect_uri: 'https://blog-gpj8.onrender.com',
      // prompt: 'login',
      audience: 'https://dev-dstps3q4l34f7d23.us.auth0.com/api/v2/',

      scope:
        'read:users read:current_user read:client_grants profile create:current_user_metadata update:current_user_metadata',
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }}
  >
    <App />
  </Auth0Provider>
)
