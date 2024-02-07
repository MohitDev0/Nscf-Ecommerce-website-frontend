import React, { useEffect, useState , useCallback } from 'react';
import "./newSlider.css";

const NewSlider = () => {

    const [active, setactive] = useState(0);
    const [translate, setTranslate] = useState(0);

    const imgs = [
        {
            url: "/images/slider1.jpg"
        },
        {
            url: "/images/slider2.jpg"
        },
        {
            url: "/images/slider3.jpg"
        }
    ]

    const slideHandler = useCallback((value) => {
        setTranslate(value);
        setTimeout(() => {
            let temp = active + value;
            if (imgs.length <= temp) {
                setactive(0);
            } else if (temp < 0) {
                setactive(imgs.length - 1);
            } else {
                setactive(temp);
            }
            setTranslate(0);
        }, 1000 / 2);
    }, [active, imgs.length]);

    useEffect(() => {
        let interval = setInterval(() => {
            slideHandler(1);
        }, 5000)
        return () => clearInterval(interval);
    }, [active, slideHandler])


    return (
        <div className="slideshow_container">
            <div className="slideshow">
                <div className="slider">
                    {imgs.map((images, index) => {
                        return (
                            active == index &&
                            <div className="item" key={index}>
                                <img className='slider_image' src={images.url} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default NewSlider