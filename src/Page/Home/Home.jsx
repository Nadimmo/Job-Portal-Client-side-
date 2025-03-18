import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestJobs from '../../Components/LatestJobs/LatestJobs'
import PopularCategories from '../../Components/PopularCategory/PopularCategory'
import Company from '../../Components/Company/Company'
import LatestBlog from '../../Components/LatestBlog/LatestBlog'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Hero/>
      <LatestJobs/>
      <PopularCategories/>
      <Company/>
      <LatestBlog/>
    </div>
  )
}

export default Home