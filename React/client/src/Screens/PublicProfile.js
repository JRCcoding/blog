import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PublicProfile = ({ location }) => {
  // ALL FOR AUTH0 INFO
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [about, setAbout] = useState()
  const [show, setShow] = useState(false)
  const [publicInfo, setPublicInfo] = useState([])
  const sub = JSON.stringify(useParams().id).replace(/['"]+/g, '')
  const navigate = useNavigate()
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'dev-dstps3q4l34f7d23.us.auth0.com'

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user',
          },
        })

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${sub}`

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const { user_metadata } = await metadataResponse.json()

        setPublicInfo(user_metadata)
      } catch (e) {
        console.log(e.message)
      }
    }

    getUserMetadata()
  }, [])
  return (
    <div>
      {isAuthenticated && <h2>{publicInfo}</h2>}
      {show ? (
        <>
          <form
            // onSubmit={submitHandler}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5px',
              border: 'solid 2px black',
              padding: '5px',
            }}
          >
            <button onClick={() => setShow(!show)}>Hide</button>
            <textarea
              type='text'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder='About me...'
            />
            <button type='submit'>Submit</button>
          </form>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: 'solid 2px black',
            padding: '5px',
          }}
        >
          <button onClick={() => setShow(!show)}>Edit About Me</button>
        </div>
      )}
    </div>
  )
}

export default PublicProfile
