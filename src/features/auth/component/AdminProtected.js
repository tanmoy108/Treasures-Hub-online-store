import React from 'react'
import { selectUser } from '../AuthSlice';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/userSlice';

const AdminProtected = ({ children }) => {
    const userData = useSelector(selectUser);
    const userInfo = useSelector(selectUserInfo);

    if (!userData) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if (userData && userInfo.role !== "admin") {
        return <Navigate to="/" replace={true}></Navigate>
    }
    return children;
}

export default AdminProtected