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
import ManageJobs from '../Page/Dashboard/ManageJobs/ManageJobs';
import ManageBlogs from '../Page/Dashboard/ManageBlogs/ManageBlogs';
import UpdateJob from '../Page/Dashboard/ManageJobs/UpdateJob';
import UpdateBlog from '../Page/Dashboard/ManageBlogs/UpdateBlog';
import ManageUsers from '../Page/Dashboard/ManageUsers/ManageUsers';
import PrivateRoute from '../Page/PrivateRoute/PrivateRoute';
import AllAppliedJobs from '../Page/Dashboard/AllAppliedJobs/AllAppliedJobs';
import Profile from '../Page/Dashboard/Profile/Profile';
import ShowDetails from '../Page/AllCompanies/ShowDetails';
import ShowJobDetails from '../Page/AllJobs/ShowJobDetils';
import Contact from '../Page/Contact/Contact';
import UsersMessage from '../Page/Dashboard/UsersMessage/UsersMessage';
import AdminRoute from '../Page/PrivateRoute/AdminRoute';


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
                path:'/showJobDetails/:id',
                element: <ShowJobDetails/>,
                loader: ({params}) => fetch(`https://job-platform-server-side.vercel.app/showJobDetails/${params.id}`)
            },
            {
                path:'/allCompanies',
                element: <AllCompanies/>
            },
            {
                path:'/showDetails/:id',
                element: <ShowDetails/>,
                loader: ({params}) => fetch(`https://job-platform-server-side.vercel.app/showDetails/${params.id}`)
            },
            {
                path:"/contact",
                element: <Contact/>
            }
        ]
    },
    {
        path:"/dashboard",
        element: <Dashboard/>,
        children: [
            {
                path:"appliedJobs",
                element: <PrivateRoute><AppliedJobs/></PrivateRoute>
            },
            {
                path:"feedback",
                element: <SendFeedback/>
            },
            {
                path:"profile",
                element: <Profile/>
            },
            {
                path:"newJob",
                element: <AdminRoute><AddNewJob/></AdminRoute>
            },
            {
                path:"newCompany",
                element: <AdminRoute><PostCompany/></AdminRoute>
            },
            {
                path:"newBlogs",
                element: <AdminRoute><LatestBlogsAndNews/></AdminRoute>
            },
            {
                path:"manageJobs",
                element: <AdminRoute><ManageJobs/></AdminRoute>
            },
            {
                path:"updateJob/:id",
                element: <AdminRoute><UpdateJob/></AdminRoute>,
                loader: ({params}) => fetch(`https://job-platform-server-side.vercel.app/updateJob/${params.id}`)
            },
            {
                path:"manageBlogs",
                element: <AdminRoute><ManageBlogs/></AdminRoute>
            },
            {
                path:"updateBlog/:id",
                element: <AdminRoute><UpdateBlog/></AdminRoute>,
                loader: ({params}) => fetch(`https://job-platform-server-side.vercel.app/updateBlog/${params.id}`)
            },
            {
                path:"manageUsers",
                element: <AdminRoute><ManageUsers/></AdminRoute>
            },
            {
                path:"allAppliedJobs",
                element: <AdminRoute><AllAppliedJobs/></AdminRoute>
            },
            {
                path:"usersMessage",
                element: <AdminRoute><UsersMessage/></AdminRoute>
            },
           
        ]
    }
]);

export default Route