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
    Navigate,
    RouterProvider,
} from "react-router-dom";

const App = () => {
    const PrivateRoute = ({ element }) => {
        const token = localStorage.getItem("jwt");
        return token ? (
            element
        ) : (
            <Navigate to="/login" replace  />
        );
    };
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: <PrivateRoute element={<Home />} />,
        },

        {
            path: "/about",
            element:<PrivateRoute element={<About />} />,
        },
        {
            path: "/contact",
            element:<PrivateRoute element={<Contact />} />,
        },
        {
            path: "/product",
            element:<PrivateRoute element={<Product />} />,
        },
        {
            path: "/cart",
            element: <PrivateRoute element={<Cart />} />,
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
