import React from 'react'
import Home from '../Page/Home/Home';
import {
    createBrowserRouter,
} from "react-router-dom";
import Root from '../Root/Root';
import About from '../Page/About/About';
import Register from '../Page/Register/Register';
import Login from '../Page/Login/Login';


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
            }
        ]
    }
]);

export default Route