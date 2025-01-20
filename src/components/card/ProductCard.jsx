import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader"; // ใช้ loader จาก react-spinners
import ClipLoader from "react-spinners/ClipLoader"; // ใช้ loader จาก react-spinners

const ProductCard = ({ item, disablePopup }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false); // สำหรับการเพิ่มสินค้า
  const [isProductLoading, setIsProductLoading] = useState(true); // สำหรับการโหลดข้อมูลสินค้า

  useEffect(() => {
    // เมื่อคอมโพเนนต์โหลด จะตั้งค่า isProductLoading เป็น false หลังจากข้อมูลโหลดเสร็จ
    setTimeout(() => {
      setIsProductLoading(false); // สถานะการโหลดข้อมูลสินค้า
    }, 1000); // สมมติว่าใช้เวลา 2 วินาทีในการโหลดข้อมูลสินค้า
  }, []);

  // เปิด popup เพื่อแสดงรายละเอียดสินค้า
  const openPopup = (product) => {
    if (disablePopup) return; // หาก disablePopup เป็น true จะไม่แสดง popup
    setSelectedItem(product);
    setIsPopupVisible(true);
  };

  // ปิด popup
  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedItem(null);
  };

  // จัดการการเพิ่มสินค้าไปยังตะกร้า
  const handleAddToCart = (product) => {
    setLoading(true); // เริ่มการโหลด
    actionAddtoCart(product);
    const toastId = toast.success("เพิ่มสินค้าลงตะกร้าแล้ว!!");
    setTimeout(() => {
      toast.dismiss(toastId);
      setLoading(false); // สิ้นสุดการโหลด
    }, 2000); // ตั้งเวลาเสร็จสิ้นการทำงาน
  };

  return (
    <>
      {/* Loading Animation สำหรับการโหลดข้อมูลสินค้า */}
      {isProductLoading ? (
        <div className="flex justify-center items-center w-full h-64 bg-gray-200 rounded-lg shadow-lg">
          <BeatLoader size={10} color="#4b9fd8" />
        </div>
      ) : (
        // Card สำหรับแสดงรายการสินค้า
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="border rounded-lg shadow-lg p-4 w-64 h-full flex flex-col justify-between cursor-pointer hover:scale-105 hover:shadow-2xl transition-all"
            onClick={() => openPopup(item)}
          >
            <div>
              {item.images?.length > 0 ? (
                <img
                  src={item.images[0]?.url}
                  className="rounded-md w-full h-40 object-cover hover:scale-110 transition-all duration-300"
                  alt={item.title}
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
                  No Image
                </div>
              )}
            </div>

            <div className="py-3 flex-grow">
              <p
                className="font-semibold text-gray-800 truncate whitespace-pre-line"
                style={{ fontSize: "15px" }}
              >
                {item.title}
              </p>
              <p className="text-sm text-gray-600 truncate">{item.description}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-bold text-blue-600">
                ฿{numberFormat(item.price)}.-
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // ป้องกันไม่ให้เปิด popup เมื่อคลิกปุ่ม
                  handleAddToCart(item);
                }}
                className={`bg-blue-500 rounded-md p-3 text-white hover:bg-blue-700 shadow-md transition-all ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading} // ปิดการทำงานของปุ่มเมื่อกำลังโหลด
              >
                {loading ? <ClipLoader size={15} color="#fff" /> : <ShoppingCart size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Popup Component */}
      {isPopupVisible && selectedItem && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative w-96 max-w-lg max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // ป้องกันการปิด popup เมื่อคลิกภายใน
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-2xl"
            >
              &times;
            </button>
            <img
              src={
                selectedItem.images?.length > 0
                  ? selectedItem.images[0]?.url
                  : "https://dummyimage.com/150/d9d6d9/000000"
              }
              alt={selectedItem.title}
              className="w-full h-72 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {selectedItem.title}
            </h2>
            <p className="text-gray-500 mb-4">
              {selectedItem.description || "No description available."}
            </p>
            <span className="text-sm font-bold text-blue-600 mb-4 block">
              ฿{numberFormat(selectedItem.price)}.-
            </span>
            <button
              onClick={() => {
                handleAddToCart(selectedItem);
                closePopup();
              }}
              className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-full ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading} // ปิดการทำงานเมื่อโหลด
            >
              {loading ? <ClipLoader size={15} color="#fff" /> : "เพิ่มไปที่ตะกร้า"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
