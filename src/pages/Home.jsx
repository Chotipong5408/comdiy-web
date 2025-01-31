import React, { useState, useEffect } from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";
import { SyncLoader } from "react-spinners"; // นำเข้า SyncLoader

const Home = () => {
  const [loadingBestSeller, setLoadingBestSeller] = useState(true); // สถานะสำหรับ BestSeller
  const [loadingNewProduct, setLoadingNewProduct] = useState(true); // สถานะสำหรับ NewProduct

  // ตัวอย่างการจำลองการดึงข้อมูล
  useEffect(() => {
    // จำลองการดึงข้อมูลสำหรับ BestSeller
    const bestSellerTimeout = setTimeout(() => {
      setLoadingBestSeller(false); // เปลี่ยนสถานะเมื่อโหลดเสร็จ
    }, 1500); // ลดเวลาให้เร็วขึ้น

    // จำลองการดึงข้อมูลสำหรับ NewProduct
    const newProductTimeout = setTimeout(() => {
      setLoadingNewProduct(false); // เปลี่ยนสถานะเมื่อโหลดเสร็จ
    }, 2000); // ลดเวลาให้เร็วขึ้น

    // คลีนอัพเมื่อคอมโพเนนต์ถูกยกเลิก
    return () => {
      clearTimeout(bestSellerTimeout);
      clearTimeout(newProductTimeout);
    };
  }, []);

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="bg-gray-100 min-h-screen p-4">
        {/* Content Carousel */}
        <ContentCarousel />

        {/* สินค้าขายดี */}
        <h2 className="text-2xl sm:text-xl md:text-3xl font-bold text-center my-6">
          สินค้าขายดี!!!
        </h2>
        {/* หากกำลังโหลดให้แสดง SyncLoader */}
        {loadingBestSeller ? (
          <div className="flex justify-center">
            <SyncLoader
              color={"#3498db"}
              loading={loadingBestSeller}
              size={20}
            />
          </div>
        ) : (
          <BestSeller /> // แสดง BestSeller หลังจากโหลดเสร็จ
        )}

        <br />
        <br />

        {/* สินค้าใหม่ */}
        <h2 className="text-2xl sm:text-xl md:text-3xl font-bold text-center my-6">
          สินค้าใหม่!!!
        </h2>
        {/* หากกำลังโหลดให้แสดง SyncLoader */}
        {loadingNewProduct ? (
          <div className="flex justify-center">
            <SyncLoader
              color={"#3498db"}
              loading={loadingNewProduct}
              size={20}
            />
          </div>
        ) : (
          <NewProduct /> // แสดง NewProduct หลังจากโหลดเสร็จ
        )}

        <br />
        <br />
      </div>
    </div>
  );
};

export default Home;
