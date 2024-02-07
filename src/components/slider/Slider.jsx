import React, { useState, useEffect, useCallback } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./slider.css";

const Slider = () => {
  const Arrow = "z-8 absolute border-2 border-black cursor-pointer !text-[4vw] top-[40%] rounded-[50%]"
  const SlidebarSideImg = "absolute -z-10 w-full h-[95%] pt-3 m-auto top-0 border-1 rounded-lg blur-sm"
  const [active, setActive] = useState(0);
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
        setActive(0);
      } else if (temp < 0) {
        setActive(imgs.length - 1);
      } else {
        setActive(temp);
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
    <div className='slider relative w-full h-[25vw] overflow-hidden pt-2 max-[600px]:h-[30vw] max-[500px]:h-[34vw]'>
      {imgs.map((img, index) => {
        if (active === index) {
          return <img className={`absolute object-cover scale-[103%] w-4/5 m-auto h-[95%] left-0 right-0 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] ${translate !== 0 ? translate === 1 ? "leftslide" : "rightslide" : ""} `} src={img.url} alt="" key={index} />
        }
        if (active - index === 1 || index - (imgs.length - 1) === active) {
          return <img className={`${SlidebarSideImg} -left-[90%] ${translate !== 0 ? translate === 1 ? "leftslide" : "rightslide" : ""}`} src={img.url} alt="" key={index} />
        }
        if (index - active === 1 || active - (imgs.length - 1) === index) {
          return <img className={`${SlidebarSideImg} -right-[90%] ${translate !== 0 ? translate === 1 ? "leftslide" : "rightslide" : ""} `} src={img.url} alt="" key={index} />
        }
        return null;
      })}
      <ArrowLeftIcon className={`${Arrow} left-[3%] max-[600px]:!text-[5vw]`} onClick={() => slideHandler(-1)} />
      <ArrowRightIcon className={`${Arrow} right-[3%] max-[600px]:!text-[5vw] `} onClick={() => slideHandler(1)} />
    </div>
  )
}

export default Slider;