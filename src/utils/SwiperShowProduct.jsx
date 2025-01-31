import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperShowProduct = ({ children }) => {
  return (
    <Swiper
      slidesPerView={2} // จำนวนสไลด์แสดงในมือถือ
      spaceBetween={10} // ลดช่องว่างระหว่างสไลด์
      pagination={false}
      navigation={true}
      modules={[Pagination, Autoplay, Navigation]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1, // สำหรับมือถือขนาดเล็กสุด
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2, // สำหรับมือถือขนาดกลาง
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 3, // สำหรับหน้าจอขนาดกลาง
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4, // สำหรับแท็บเล็ต
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 5, // สำหรับจอคอมพิวเตอร์
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 6, // สำหรับจอขนาดใหญ่
          spaceBetween: 50,
        },
      }}
      className="custom-swiper mySwiper object-cover rounded-md"
    >
      {children}
    </Swiper>
  );
};

export default SwiperShowProduct;
