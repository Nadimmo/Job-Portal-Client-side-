import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

const Root = () => {
  const location = useLocation()
  const noHeaderFooter = location.pathname.includes("showDetails") || location.pathname.includes("showJobDetails")
  return (
    <div>
       {noHeaderFooter || <Header></Header>}
        <Outlet/>
        {noHeaderFooter || <Footer/>}
    </div>
  )
}

export default Root