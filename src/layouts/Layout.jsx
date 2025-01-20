import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNav from "../components/MainNav";
import Footer from "../Footer";

const Layout = () => {
  const location = useLocation();

  // Log location.pathname เพื่อดู path ปัจจุบัน
  console.log("Current path:", location.pathname);

  // กำหนดหน้าที่ต้องการซ่อน Footer
  const hideFooterPaths = ["/admin", "/cart", "/checkout"];
  
  // ถ้า location.pathname คือ "/user/history" ไม่ซ่อน Footer
  const hideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div>
      <MainNav />

      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet />
      </main>

      {/* แสดง Footer เฉพาะเมื่อไม่อยู่ในหน้าที่กำหนด */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
