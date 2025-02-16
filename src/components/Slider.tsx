"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Slider = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 620px)' })
  const [current, setCurrent] = useState(0);

  const banners = [
    {
      id: 3,
      title: "Spring Sale Collections",
      description: "Sale! Up to 50% off!",
      img: isMobile ? "/banners/mobile_1.jpg" : "/banners/purple1.png",
      url: "/",
      bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
    {
      id: 2,
      title: "Winter Sale Collections",
      description: "Sale! Up to 50% off!",
      img: isMobile ? "/banners/mobile_2.jpg" : "/banners/purple2.png",
      url: "/",
      bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
    {
      id: 1,
      title: "Summer Sale Collections",
      description: "Sale! Up to 50% off!",
      img: isMobile ? "/banners/mobile_3.jpg" : "/banners/blue1.png",
      url: "/",
      bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
  ]

  const [slides, setSlides] = useState<any>([]);
  useEffect(() => {
    setSlides(banners);
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(80vh-80px)] sm:h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide: any) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            <div className="w-full h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-contain w-full"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto sm:left-1/2 left-[42%] sm:bottom-8 bottom-56 flex gap-4">
        {slides.map((slide: any, index: number) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-lama cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""
              }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-lama rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
