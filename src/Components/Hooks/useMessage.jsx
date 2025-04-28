import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosPublic from './useAxiosPublic'

const useMessage = () => {
    const axiosPublic = useAxiosPublic()
    const {refetch, data: messages = [] } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await axiosPublic.get("/contact")
            return res.data
        }
    })
    return { messages, refetch }
}

export default useMessage