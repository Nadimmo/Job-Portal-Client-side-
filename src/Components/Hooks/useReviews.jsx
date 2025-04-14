import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useReviews = () => {
    const axiosPublic = useAxiosPublic()

    const { data: testimonials = [] } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allReviews')
            return res.data
        }

    })
    return [testimonials]
}

export default useReviews