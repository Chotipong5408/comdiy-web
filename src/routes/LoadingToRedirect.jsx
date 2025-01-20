import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // นำเข้า ClipLoader

const style = {
  fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  textAlign: "center", // จัดให้อยู่ตรงกลาง
  marginTop: "20%",
};

const LoadingToRedirect = () => {
  const [count, setCount] = useState(4);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div style={style}>
      <ClipLoader size={80} color="#3498db" /> {/* ใช้ ClipLoader */}
    </div>
  );
};

export default LoadingToRedirect;
