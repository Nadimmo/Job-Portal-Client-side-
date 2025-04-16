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
import AddNewJob from '../Page/Dashboard/AddNewJob/AddNewJob';
import PostCompany from '../Page/Dashboard/PostCompany/PostCompany';
import LatestBlogsAndNews from '../Page/Dashboard/LatestBlogsAndNews/LatestBlogsAndNews';
import SendFeedback from '../Page/Dashboard/SendFeedbac/SendFeedbac';


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
            },
            {
                path:"feedback",
                element: <SendFeedback/>
            },
            {
                path:"newJob",
                element: <AddNewJob/>
            },
            {
                path:"newCompany",
                element: <PostCompany/>
            },
            {
                path:"newBlogs",
                element: <LatestBlogsAndNews/>
            }
        ]
    }
]);

export default Route