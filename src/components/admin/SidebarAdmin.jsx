import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
  LogOut,
} from "lucide-react";

const SidebarAdmin = () => {
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    // ลบข้อมูลการเข้าสู่ระบบ เช่น token
    localStorage.removeItem("authToken"); // ตัวอย่างการลบ token
    localStorage.removeItem("userRole");

    // เปลี่ยนเส้นทางไปหน้าหลัก
    navigate("/");
  };


  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };
  
  return (
    <div style={style}>
    <div
      className="bg-gradient-to-b from-gray-800 to-gray-900 w-64 text-gray-100 
    flex flex-col h-screen shadow-lg"
    >
      {/* Header */}
      <div
        className="h-24 bg-gradient-to-r from-gray-700 to-gray-800 
      flex items-center justify-center text-2xl font-extrabold text-white shadow-md"
      >
        Admin Control
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-4">
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 rounded-md text-white px-4 py-3 flex items-center shadow-lg transition-transform transform scale-105"
              : "text-gray-300 px-4 py-3 hover:bg-blue-500 hover:text-white rounded flex items-center transition-colors"
          }
        >
          <UserCog className="mr-3" />
          Manage
        </NavLink>

        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 rounded-md text-white px-4 py-3 flex items-center shadow-lg transition-transform transform scale-105"
              : "text-gray-300 px-4 py-3 hover:bg-blue-500 hover:text-white rounded flex items-center transition-colors"
          }
        >
          <SquareChartGantt className="mr-3" />
          Category
        </NavLink>

        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 rounded-md text-white px-4 py-3 flex items-center shadow-lg transition-transform transform scale-105"
              : "text-gray-300 px-4 py-3 hover:bg-blue-500 hover:text-white rounded flex items-center transition-colors"
          }
        >
          <ShoppingBasket className="mr-3" />
          Product
        </NavLink>

        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-600 rounded-md text-white px-4 py-3 flex items-center shadow-lg transition-transform transform scale-105"
              : "text-gray-300 px-4 py-3 hover:bg-blue-500 hover:text-white rounded flex items-center transition-colors"
          }
        >
          <ListOrdered className="mr-3" />
          Orders
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4">
        <button
          onClick={handleLogout}
          className="text-gray-300 px-4 py-3 hover:bg-red-500 hover:text-white rounded-md flex items-center w-full transition-colors shadow-md"
        >
          <LogOut className="mr-3" />
          Exit
        </button>
      </div>
    </div>
    </div>
  );
};

export default SidebarAdmin;
