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
                loader: ({params}) => fetch(`http://localhost:5000/showJobDetails/${params.id}`)
            },
            {
                path:'/allCompanies',
                element: <AllCompanies/>
            },
            {
                path:'/showDetails/:id',
                element: <ShowDetails/>,
                loader: ({params}) => fetch(`http://localhost:5000/showDetails/${params.id}`)
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
            },
            {
                path:"manageJobs",
                element: <ManageJobs/>
            },
            {
                path:"updateJob/:id",
                element: <UpdateJob/>,
                loader: ({params}) => fetch(`http://localhost:5000/updateJob/${params.id}`)
            },
            {
                path:"manageBlogs",
                element: <ManageBlogs/>
            },
            {
                path:"updateBlog/:id",
                element: <UpdateBlog/>,
                loader: ({params}) => fetch(`http://localhost:5000/updateBlog/${params.id}`)
            },
            {
                path:"manageUsers",
                element: <ManageUsers/>
            },
            {
                path:"allAppliedJobs",
                element: <AllAppliedJobs/>
            },
            {
                path:"profile",
                element: <Profile/>
            }
        ]
    }
]);

export default Route