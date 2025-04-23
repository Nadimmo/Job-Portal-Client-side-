import React, { useContext } from 'react'
import useAxiosPublic from './useAxiosPublic'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import { useQuery } from '@tanstack/react-query'

const useSaveJobs = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext)

    const { refetch, data: savedJobs = [] } = useQuery({
        queryKey: ['savedJobs', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/saveJobs?email=${user?.email}`)
            return res.data
        },
    })
    return { savedJobs, refetch }
}

export default useSaveJobs