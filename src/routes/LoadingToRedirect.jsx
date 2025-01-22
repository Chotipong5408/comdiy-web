import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // นำเข้า ClipLoader

const LoadingToRedirect = () => {
  const [count, setCount] = useState(6);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "'Sarabun', sans-serif",
      }}
    >
      <ClipLoader size={80} color="#3498db" /> {/* แสดงตัวโหลด */}
      <p
        style={{
          marginTop: "20px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#3498db",
        }}
      >
        กำลังโหลด...
      </p>
      <p style={{ fontSize: "18px", color: "#555" }}>
        ระบบจะนำคุณเปลี่ยนหน้าใน {count} วินาที
      </p>
    </div>
  );
};

export default LoadingToRedirect;
