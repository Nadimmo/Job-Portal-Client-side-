import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

const Root = () => {
  return (
    <div>
        <Header></Header>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Root