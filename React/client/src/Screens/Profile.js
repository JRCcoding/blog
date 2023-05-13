import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
  const { user, isAuthenticated } = useAuth0()
  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '60%' }}>
      {isAuthenticated ? (
        <>
          <img src={user.picture} alt={user.name} />
          <br />
          {user.name}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Profile
