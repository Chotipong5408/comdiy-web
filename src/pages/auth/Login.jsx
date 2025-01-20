import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"; // Import icons for showing/hiding password
import { DotLoader } from "react-spinners";  // นำเข้า DotLoader

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  console.log("user from zustand", user);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // สร้าง state สำหรับการโหลด

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // ตั้งค่า loading เป็น true เมื่อเริ่มส่งข้อมูล
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Welcome");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    } finally {
      setLoading(false); // ตั้งค่า loading เป็น false เมื่อการส่งข้อมูลเสร็จสิ้น
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/manage");
    } else {
      navigate("/");
    }
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r ">
        <div className="w-full shadow-lg rounded-lg bg-white p-8 max-w-md">
          <h1 className="text-3xl text-center my-4 font-extrabold text-gray-800 flex items-center justify-center">
            <FaLock className="text-blue-500 mr-2" /> {/* เพิ่มไอคอนรูปกุญแจ */}
            ลงชื่อเข้าใช้
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <input
                placeholder="Email"
                className="border w-full px-4 py-3 rounded-lg text-gray-700 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              focus:border-transparent"
                onChange={handleOnChange}
                name="email"
                type="email"
              />
              <div className="relative">
                <input
                  placeholder="Password"
                  className="border w-full px-4 py-3 rounded-lg text-gray-700 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-500
                focus:border-transparent"
                  onChange={handleOnChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                />
                <span
                  className="absolute right-4 top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <p className="text-center text-gray-600 mt-4">
                ยังไม่มีบัญชีใช่ไหม?{" "}
                <a
                  href="/register"
                  className="text-blue-500 underline"
                >
                  คลิกที่นี่
                </a>{" "}
                เพื่อทำการสมัคร
              </p>
              <button
                className="bg-blue-500 rounded-lg w-full text-white font-bold py-3 shadow hover:bg-blue-700 transition duration-300"
                disabled={loading} // ปิดปุ่มเมื่อกำลังโหลด
              >
                {loading ? (
                  <DotLoader color="white" size={20} /> // แสดง DotLoader ขณะกำลังโหลด
                ) : (
                  "ลงชื่อเข้าใช้"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
