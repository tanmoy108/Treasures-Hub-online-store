import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'

const UserInfoPage = () => {
  return (
    <>
    <Navbar>
        <UserProfile/>
    </Navbar>
    </>
  )
}

export default UserInfoPage