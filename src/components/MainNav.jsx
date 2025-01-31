import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { ChevronDown } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

function MainNav() {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const profileImage =
    user?.profileImage ||
    "https://cdn-icons-png.flaticon.com/256/3177/3177440.png";

  const handleLogout = () => {
    setIsLoading(true);
    logout();
    setTimeout(() => {
      setIsLoading(false);
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    setIsOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Links */}
          <div className="flex items-center gap-6">
            <Link
              to={"/"}
              className="font-bold bg-white flex items-center gap-2 text-lg sm:text-3xl"
            >
              <i className="bi bi-pc-display text-lg sm:text-3xl"></i>
              <span className="text-lg sm:text-3xl">COMDIY</span>
            </Link>

            <div className="hidden sm:flex gap-6">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    : "hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                }
                to={"/"}
              >
                <i className="bi bi-house-fill mr-1 text-lg"></i> HOME
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    : "hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                }
                to={"/shop"}
              >
                <i className="bi bi-bag-fill mr-1 text-lg"></i> SHOP
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="sm:hidden text-lg px-3 py-2"
          >
            {isMobileMenuOpen ? (
              <i className="bi bi-list"></i>
            ) : (
              <i className="bi bi-list"></i>
            )}
          </button>

          {/* Cart and User section */}
          <div className="ml-auto flex items-center gap-6">
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
                  <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <Link
                      to={"/user/history"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="bi bi-clock-history mr-2"></i> History
                    </Link>
                    <Link
                      to={"/admin/manage"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="bi bi-gear-fill mr-2"></i> Admin Control
                    </Link>
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
                <div className="flex space-x-2">
                  <NavLink
                    to={"/register"}
                    className="hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <i className="bi bi-person-plus-fill text-lg ml-1"></i>
                    <span className="hidden sm:inline">สร้างบัญชี</span>
                  </NavLink>

                  <NavLink
                    to={"/login"}
                    className="hover:bg-gray-100 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <i className="bi bi-box-arrow-in-right text-lg ml-1"></i>
                    <span className="hidden sm:inline">ลงชื่อเข้าใช้</span>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Fixed issue */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md sm:hidden">
          <NavLink to={"/"} className="block px-4 py-2 text-sm text-black">
            <i className="bi bi-house-fill mr-1 text-lg"></i>HOME
          </NavLink>
          <NavLink to={"/shop"} className="block px-4 py-2 text-sm text-black">
            <i className="bi bi-bag-fill mr-1 text-lg"></i>SHOP
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default MainNav;
