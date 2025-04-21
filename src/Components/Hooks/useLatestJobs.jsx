import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useLatestJobs = () => {
    const axiosPublic = useAxiosPublic()
    const { data: latestJobs = [] } = useQuery({
        queryKey: ["latestJobs"],
        queryFn: async () => {
            const res = await axiosPublic.get('/latestJobs')
            return res.data
        }
    })
    return { latestJobs }
}

export default useLatestJobs