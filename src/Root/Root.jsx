import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

const Root = () => {
  const location = useLocation()
  console.log(location.pathname)
  const noHeaderFooter = location.pathname.includes("showDetails")
  return (
    <div>
       {noHeaderFooter || <Header></Header>}
        <Outlet/>
        {noHeaderFooter || <Footer/>}
    </div>
  )
}

export default Root