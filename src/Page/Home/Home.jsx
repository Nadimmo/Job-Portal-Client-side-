import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestJobs from '../../Components/LatestJobs/LatestJobs'
import PopularCategories from '../../Components/PopularCategory/PopularCategory'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Hero/>
      <LatestJobs/>
      <PopularCategories/>
    </div>
  )
}

export default Home