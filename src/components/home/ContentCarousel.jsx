import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const ContentCarousel = () => {
  // กำหนดภาพที่ต้องการใช้
  const folderPath = "/comdiy/"; // ใช้เส้นทางจาก public
  const images = [
    "w11.jpg",
    "w4.jpg",
    "w3.jpg",
    "b4.jpg",
    "b22.jpg",
    "b3.jpg",
  ].map(filename => folderPath + filename);
  
  
  console.log(images);
  

  return (
    <div>
      {/* แสดงภาพหลักแบบ Carousel */}
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 object-cover rounded-md mb-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="rounded-md object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>


    </div>
  );
};

export default ContentCarousel;
