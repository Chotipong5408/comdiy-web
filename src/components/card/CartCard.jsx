import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );

  // ฟังก์ชันเพิ่มจำนวนสินค้า
  const increaseQuantity = (productId, count) => {
    actionUpdateQuantity(productId, count + 1);
  };

  // ฟังก์ชันลดจำนวนสินค้า
  const decreaseQuantity = (productId, count) => {
    if (count > 1) {
      actionUpdateQuantity(productId, count - 1);
    }
  };

  // ฟังก์ชันจัดการกรอกจำนวนสินค้าด้วยตัวเอง
  const handleQuantityChange = (productId, event) => {
    let newCount = parseInt(event.target.value);
    if (newCount > 0) {
      actionUpdateQuantity(productId, newCount);
    }
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif",
  };

  return (
<div style={style} className="p-4">
  <div className="border p-4 rounded-lg shadow-lg bg-white">
    {carts.length > 0 ? (
      carts.map((item, index) => (
        <div
          key={index}
          className="relative bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-xl transition-shadow duration-300"
        >
          {/* Row 1: Product Info */}
          <div className="flex flex-col sm:flex-row justify-between mb-4 items-center">
            <div className="flex gap-4 items-center">
              {item.images?.length > 0 ? (
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover"
                  src={item.images[0].url}
                  alt={item.title}
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              <div>
                <p className="font-semibold text-gray-800 truncate text-sm sm:text-base">{item.title}</p>
                <p className="text-xs sm:text-sm text-gray-500">{item.description}</p>
              </div>
            </div>

            {/* ถังขยะ - ปรับตำแหน่งไปมุมขวาล่าง */}
            <button
              onClick={() => actionRemoveProduct(item.id)}
              className="absolute bottom-2 right-2 text-red-600 hover:text-red-800 transition"
            >
              <Trash2 size={24} />
            </button>
          </div>

          {/* Row 2: Quantity and Price */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* ปุ่มเพิ่ม/ลดจำนวนสินค้า */}
            <div className="flex items-center mb-4 sm:mb-0">
              <button
                onClick={() => decreaseQuantity(item.id, item.count)}
                className="bg-gray-300 text-black py-2 px-4 rounded-l-md hover:bg-gray-400"
              >
                -
              </button>

              {/* Input สำหรับกรอกจำนวนสินค้า */}
              <input
                type="number"
                value={item.count}
                onChange={(e) => handleQuantityChange(item.id, e)}
                className="w-12 text-center py-2 border rounded-md mx-2"
                min="1"
              />

              <button
                onClick={() => increaseQuantity(item.id, item.count)}
                className="bg-gray-300 text-black py-2 px-4 rounded-r-md hover:bg-gray-400"
              >
                +
              </button>
            </div>

            <div className="text-lg font-bold text-blue-500">
              {numberFormat(item.price * item.count)} <span className="text-black text-sm">บาท</span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">ตะกร้าของคุณว่างเปล่า</p>
    )}
  </div>
</div>


  );
};

export default CartCard;
