import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useSaveJobs = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { refetch, data: savedJobs = [] } = useQuery({
        queryKey: ['savedJobs', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/saveJobs?email=${user?.email}`)
            return res.data
        },
    })
    return { savedJobs, refetch }
}

export default useSaveJobs