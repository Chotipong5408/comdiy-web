import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";

const registerSchema = z
  .object({
    email: z.string().email({ message: "กรุณากรอก Email!!!" }),
    password: z
      .string()
      .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัว" })
      .regex(/^[A-Za-z0-9]+$/, {
        message: "รหัสผ่านต้องประกอบด้วยตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [loading, setLoading] = useState(false); // สร้าง state สำหรับสถานะการโหลด
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    const password = watch().password;
    if (password) {
      setPasswordEntered(true);
    } else {
      setPasswordEntered(false);
    }
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const passwordStrengthLabel = [
    "รหัสผ่านยังอ่อนเกินไป",
    "รหัสผ่านค่อนข้างอ่อน",
    "รหัสผ่านปานกลาง",
    "รหัสผ่านแข็งแกร่ง",
    "รหัสผ่านแข็งแกร่งมาก",
  ];

  const passwordStrengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
  ];

  const onSubmit = async (data) => {
    setLoading(true);  // ตั้งค่า loading เป็น true เมื่อเริ่มส่งข้อมูล

    try {
      const res = await axios.post("https://comdiy-api.vercel.app/api/register", data);
      toast.success(res.data);
      reset();
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    } finally {
      setLoading(false);  // ตั้งค่า loading เป็น false เมื่อการส่งข้อมูลเสร็จสิ้น
    }
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif",
  };

  return (
    <div style={style}>
      <div style={{ background: "#f9fafb" }}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r ">
          <div className="w-full shadow-lg rounded-lg bg-white p-8 max-w-md">
            <h1 className="text-3xl text-center my-4 font-extrabold text-gray-800 flex items-center justify-center">
              <FaUserPlus className="text-blue-500 mr-2" />{" "}
              สร้างบัญชี
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <input
                    {...register("email", {
                      required: "กรุณากรอกอีเมล",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "กรุณากรอกอีเมลให้ถูกต้อง",
                      },
                    })}
                    placeholder="Email"
                    className={`border w-full px-4 py-3 rounded-lg text-gray-700 shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent
                    ${errors.email && "border-red-500"}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    {...register("password", {
                      required: "กรุณากรอกรหัสผ่าน",
                      minLength: {
                        value: 8,
                        message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัว",
                      },
                      pattern: {
                        value: /^[A-Za-z0-9]+$/,
                        message:
                          "รหัสผ่านต้องมีเพียงตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น",
                      },
                    })}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className={`border w-full px-4 py-3 rounded-lg text-gray-700 shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent
                    ${errors.password && "border-red-500"}`}
                  />
                  <span
                    className="absolute right-4 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "กรุณายืนยันรหัสผ่าน",
                      validate: (value) =>
                        value === watch("password") || "รหัสผ่านไม่ตรงกัน",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className={`border w-full px-4 py-3 rounded-lg text-gray-700 shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    focus:border-transparent
                    ${errors.confirmPassword && "border-red-500"}`}
                  />
                  <span
                    className="absolute right-4 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {passwordEntered && (
                  <div>
                    <div
                      className={`w-full h-2 rounded-lg ${passwordStrengthColor[passwordScore]}`}
                    ></div>
                    <p className="text-sm text-center mt-2 text-gray-600">
                      {passwordStrengthLabel[passwordScore]}
                    </p>
                  </div>
                )}

                <p className="text-center text-gray-600 mt-4">
                  มีบัญชีอยู่แล้วใช่ไหม?{" "}
                  <a
                    href="/login"
                    className="text-blue-500 underline"
                  >
                    คลิกที่นี่
                  </a>{" "}
                  เพื่อลงชื่อเข้าใช้
                </p>

                <button
                  className="bg-blue-500 rounded-lg w-full text-white font-bold py-3 shadow hover:bg-blue-700 transition duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <DotLoader color="white" size={20} />
                  ) : (
                    "สร้างบัญชี"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
