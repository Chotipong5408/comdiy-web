import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader"; // นำเข้า

function MainNav() {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // สถานะการโหลด
  const location = useLocation(); // ใช้ useLocation เพื่อตรวจจับเส้นทางที่เปลี่ยนแปลง

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const profileImage = user && user.profileImage 
  ? user.profileImage 
  : "https://cdn-icons-png.flaticon.com/256/3177/3177440.png";

  const handleLogout = () => {
    setIsLoading(true); // ตั้งค่า isLoading เป็น true ก่อนทำการ logout
    logout(); // เรียกใช้งาน logout function
    setTimeout(() => {
      setIsLoading(false); // ตั้งค่า isLoading เป็น false หลังจาก logout
    }, 1000); // ตั้งเวลาให้เหมือนการทำงานจริง (ตัวอย่าง 2 วินาที)
  };

  useEffect(() => {
    // เมื่อเส้นทางเปลี่ยน จะปิด dropdown
    setIsOpen(false);
  }, [location]); // ติดตามการเปลี่ยนแปลงของ location

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Links */}
          <div className="flex items-center gap-6">
            <Link
              to={"/"}
              className="text-3xl font-bold bg-white flex items-center gap-2"
            >
              <i className="bi bi-pc-display text-3xl"></i> COMDIY
            </Link>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              }
              to={"/"}
            >
              <i className="bi bi-house-fill mr-1 text-lg"></i>HOME
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  : "hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              }
              to={"/shop"}
            >
              <i className="bi bi-bag-fill mr-1 text-lg"></i>SHOP
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium relative"
                  : "hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium relative"
              }
              to={"/cart"}
            >
              <i className="bi bi-cart-fill mr-1 text-base"></i>
              {carts.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">
                  {carts.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* User Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-md focus:outline-none"
              >
                <img
                  className="w-8 h-8 rounded-full border border-gray-300"
                  src={profileImage}
                  alt="User Profile"
                />
                <ChevronDown />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link
                    to={"/user/history"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="bi bi-clock-history mr-2"></i> History
                  </Link>

                  {/* เพิ่ม Edit Profile
                  <Link
                    to={"/user/edit-profile"} // ลิงก์ไปที่หน้า Edit Profile
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="bi bi-pencil-fill mr-2"></i> Edit Profile
                  </Link> */}

                  {/* ปุ่ม Admin Control */}
                  <Link
                    to={"/admin/manage"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <i className="bi bi-gear-fill mr-2"></i> Admin Control
                  </Link>

                  {/* ปุ่ม Logout */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <i className="bi bi-box-arrow-right mr-2"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={style}>
              <div className="flex items-center gap-4">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                      : "hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  }
                  to={"/register"}
                >
                  <i className="bi bi-person-plus-fill mr-1"></i> สร้างบัญชี
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                      : "hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  }
                  to={"/login"}
                >
                  <i className="bi bi-box-arrow-in-right mr-1"></i>{" "}
                  ลงชื่อเข้าใช้
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* แสดง LoadingIndicator */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <ClipLoader color="#3498db" size={80} />
        </div>
      )}
    </nav>
  );
}

export default MainNav;
