import React from 'react'
import { selectUser } from '../AuthSlice';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Protected = (children) => {
    const userData = useSelector(selectUser);

    if(!userData)
    {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    return children;
}

export default Protected