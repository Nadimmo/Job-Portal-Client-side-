import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useAllAppliedJobs = () => {
    const axiosPublic = useAxiosPublic()
    const { refetch, data: appliedAllJobs = [] } = useQuery({
        queryKey: ['appliedAllJobs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/appliedAllJobs')
            return res.data
        },
    })
    return { appliedAllJobs , refetch}
}

export default useAllAppliedJobs