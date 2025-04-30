import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'
import useAdmin from '../../Components/Hooks/useAdmin'

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if (loading && isAdminLoading) {
        return <>
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
            <span className="loading loading-ring loading-xl"></span>
        </>
    }
    if (user && isAdmin) {
        return children
    }

    return <Navigate state={location?.pathname} to={'/login'} replace={true} />
}

export default AdminRoute