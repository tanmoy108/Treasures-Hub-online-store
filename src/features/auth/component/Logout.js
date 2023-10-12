import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { logOutUserAsync, selectUser } from '../AuthSlice'

const Logout = () => {
    const dispatch = useDispatch()
    const userData = useSelector(selectUser)
    useEffect(() => {
        dispatch(logOutUserAsync())
    }, [dispatch])
    return (
        <>
        {!userData && <Navigate to="/login" replace={true} ></Navigate>}
        </>
    )
}

export default Logout