import React, { useState } from "react";
import { ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import ClipLoader from "react-spinners/ClipLoader"; // ใช้ loader

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const clearCart = useEcomStore((state) => state.clearCart);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // สถานะการโหลด

  const handleSaveCart = async () => {
    setLoading(true); // เริ่มการโหลด
    await createUserCart(token, { cart })
      .then((res) => {
        toast.success("บันทึกใส่ตะกร้าเรียบร้อยแล้ว", {
          position: "top-center",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        toast.warning(err.response.data.message);
      })
      .finally(() => {
        setLoading(false); // หยุดการโหลด
      });
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="bg-gray-100 rounded-lg p-6 min-h-screen relative">
        {/* Header */}

        {/* Right - Total */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[300px] fixed bottom-8 right-8 space-y-4">
          <p className="text-2xl font-bold text-gray-800">ยอดรวม</p>
          <div className="flex justify-between text-lg font-semibold">
            <span>รวมสุทธิ</span>
            <span className="text-2xl font-bold text-blue-500">
              {numberFormat(getTotalPrice())}{" "}
              <span className="text-black text-sm">บาท</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {user ? (
    <button
    disabled={cart.length < 1 || loading} // ปิดปุ่มระหว่างการโหลด
    onClick={handleSaveCart}
    className={`bg-blue-500 w-full rounded-md text-white py-3 shadow-md transition-all ${
      loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
    }`}
  >
    {loading ? (
      <>
        <ClipLoader size={20} color="#fff" className="inline-block mr-2" />
        กำลังโหลด...
      </>
    ) : (
      "สั่งซื้อ"
    )}
  </button>
            ) : (
              <a href="/login">
                <button className="bg-blue-500 w-full rounded-md text-white py-3 shadow-md hover:bg-blue-700 transition-all">
                  ลงชื่อเข้าใช้
                </button>
              </a>
            )}

            <Link>
              <button
                className="bg-red-500 w-full rounded-md text-white py-2.5 shadow-md hover:bg-red-700 transition-all"
                onClick={clearCart}
              >
                ล้างตะกร้า
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
