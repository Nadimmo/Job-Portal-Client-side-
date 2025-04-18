import React from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic'
const useAllJobs = () => {
    const axiosPublic = useAxiosPublic()
    const { refetch, data: allJobs = [] } = useQuery({
        queryKey: ['allJobs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allJobs')
            return res.data
        }
    })
    return {refetch, allJobs}
}

export default useAllJobs