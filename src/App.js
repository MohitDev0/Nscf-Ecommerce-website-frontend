import React from 'react';
import "./main.css";
import Login from './pages/Login';
import Home from "./pages/Home";
import About from './pages/About';
import Contact from "./pages/Contact";
import Product from './pages/Product';
import Cart from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import {
    createBrowserRouter,
    Routes,
    Route,
    Navigate,
    RouterProvider,
} from "react-router-dom";

const App = () => {
    const token = localStorage.getItem("jwt");
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: token ? <Home /> : <Navigate to="/login" replace />,
        },
        {
            path: "/about",
            element: token ? <About /> : <Navigate to="/login" replace />,
        },
        {
            path: "/contact",
            element: token ? <Contact /> : <Navigate to="/login" replace />,
        },
        {
            path: "/product",
            element: token ? <Product /> : <Navigate to="/login" replace />,
        },
        {
            path: "/cart",
            element: token ? <Cart /> : <Navigate to="/login" replace />,
        }
    ]);

    return (
        <div>
            <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 4000 }} />
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
