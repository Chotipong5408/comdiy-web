import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import { X, Search } from "lucide-react";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="font-sarabun">
        <div className="flex">
          {/* ปุ่มค้นหาสำหรับมือถือ */}
          <button
            onClick={toggleSearch}
            className="sm:hidden fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <Search className="w-6 h-6" />
          </button>

          {/* SearchBar - แสดงในคอมพิวเตอร์ */}
          <div className="hidden sm:block w-1/4 p-4 bg-gray-100 h-screen">
            <SearchCard />
          </div>

          {/* SearchBar - แสดงแบบ Modal ในมือถือ */}
          {isSearchOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40"
              onClick={toggleSearch} // คลิกที่พื้นหลังเพื่อปิด
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative"
                onClick={(e) => e.stopPropagation()} // ป้องกันปิดเมื่อคลิกด้านใน
              >
                <button
                  onClick={toggleSearch}
                  className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                >
                  <X className="w-6 h-6" />
                </button>
                <SearchCard />
              </div>
            </div>
          )}

          {/* Product List */}
          <div className="w-full p-4 overflow-y-auto">
            <p className="text-2xl font-bold mb-"></p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {/* Product Card */}
              {products.map((item, index) => (
                <ProductCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
