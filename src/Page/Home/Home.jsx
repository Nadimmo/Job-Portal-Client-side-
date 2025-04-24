import React from 'react'
import Hero from '../../Components/Hero/Hero'
import PopularCategories from '../../Components/PopularCategory/PopularCategory'
import Company from '../../Components/Company/Company'
import LatestBlog from '../../Components/LatestBlog/LatestBlog'
import Testimonials from '../../Components/Testimonials/Testimonials'
import HowItWorks from '../../Components/HowItWorks/HowItWorks'
import CTAForEmployers from '../../Components/CTAForEmployers/CTAForEmployers'
import NewsletterSignup from '../../Components/NewsletterSignup/NewsletterSignup'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Hero/>
      <PopularCategories/>
      <Company/>
      <HowItWorks/>
      <CTAForEmployers/>
      <Testimonials/>
      <LatestBlog/>
      <NewsletterSignup/>
    </div>
  )
}

export default Home;