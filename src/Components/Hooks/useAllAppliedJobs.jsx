import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useAllAppliedJobs = () => {
    const axiosSecure= useAxiosSecure()
    const { refetch, data: appliedAllJobs = [] } = useQuery({
        queryKey: ['appliedAllJobs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/appliedAllJobs')
            return res.data
        },
    })
    return { appliedAllJobs , refetch}
}

export default useAllAppliedJobs