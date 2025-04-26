import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useAppliedJob = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { refetch, data: appliedJobs = [] } = useQuery({
        queryKey: ["appliedJobs", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/appliedJobs?email=${user?.email}`)
            return res.data
        },
    })
    return { appliedJobs, refetch }
}

export default useAppliedJob