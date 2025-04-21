import React, { useContext } from 'react'
import useAxiosPublic from './useAxiosPublic'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import { useQuery } from '@tanstack/react-query'

const useAppliedJob = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext)

    const { refetch, data: appliedJobs = [] } = useQuery({
        queryKey: ["appliedJobs", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/appliedJobs?email=${user?.email}`)
            return res.data
        },
    })
    return { appliedJobs, refetch }
}

export default useAppliedJob