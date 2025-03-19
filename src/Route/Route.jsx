import React from 'react'
import Home from '../Page/Home/Home';
import {
    createBrowserRouter,
} from "react-router-dom";
import Root from '../Root/Root';
import About from '../Page/About/About';
import Register from '../Page/Register/Register';
import Login from '../Page/Login/Login';
import AllJobs from '../Page/AllJobs/AllJobs';
import AllCompanies from '../Page/AllCompanies/AllCompanies';
import AppliedJobs from '../Page/Dashboard/AppliedJobs/AppliedJobs';
import Dashboard from './Dashboard';


const Route = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path:'/register', 
                element: <Register/>
            },
            {
                path:'/login', 
                element: <Login/>
            },
            {
                path:'/allJobs',
                element: <AllJobs/>
            },
            {
                path:'/allCompanies',
                element: <AllCompanies/>
            }
        ]
    },
    {
        path:"/dashboard",
        element: <Dashboard/>,
        children: [
            {
                path:"appliedJobs",
                element: <AppliedJobs/>
            }
        ]
    }
]);

export default Route