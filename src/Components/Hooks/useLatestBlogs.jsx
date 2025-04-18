import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useLatestBlogs = () => {
    const axiosPublic = useAxiosPublic()

    const { data: blogs = [] } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await axiosPublic.get("/latestBlogs")
            return res.data;
        }
    })
    return {blogs}
}

export default useLatestBlogs