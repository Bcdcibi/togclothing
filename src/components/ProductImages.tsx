"use client";

import Image from "next/image";

import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import 'swiper/css';

const ProductImages = ({ items }: { items: any }) => {
  return (
    <div className="">
      <Swiper className="h-[450px] sm:h-[650px] relative"
        modules={[Navigation, Scrollbar]}
        navigation
        scrollbar={{ draggable: true }}>
        {items.map((item: any, i: number) => (
          <SwiperSlide
            key={i}>
            <Image
              src={item.image?.url}
              alt=""
              fill
              sizes="50vw"
              className="object-cover object-top rounded-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImages;
