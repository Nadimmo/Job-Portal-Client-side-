import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from '@tanstack/react-query'

const useAllCompany = () => {
    const axiosPublic =  useAxiosPublic()
    const {data: companies =[]} = useQuery({
        queryKey: ['companies'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allCompanies')
            return res.data
        },
        
    })
  return {companies}
}

export default useAllCompany