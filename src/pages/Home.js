import React from 'react';
import Topbar from '../components/topbar/Topbar';
import Slider from '../components/slider/Slider';
import Products from '../components/Products/Products';
import Features from '../components/features/Features';
import Comments from "../components/comments/Comments";
import Footer from "../components/footer/Footer";
import AddComment from '../components/addComment/AddComment';
import NewSlider from '../components/slider/NewSlider';
// import { useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';


const Home = () => {
    return (
        <>
            <Topbar />
            {/* <Slider /> */}
            <NewSlider />
            <Features />
            <Products />
            <Comments />
            <AddComment />
            <Footer />
        </>
    )
}

export default Home;