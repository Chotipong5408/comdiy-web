import React, { useState, useEffect } from "react";
import { getListAllUsers, deleteUser } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่มสถานะ loading

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    setLoading(true); // เริ่มโหลด
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
        setLoading(false); // จบโหลด
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // จบโหลด แม้มีข้อผิดพลาด
      });
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("อัพเดทสถานะสำเร็จ!!");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then(() => {
        handleGetUsers(token);
        toast.success("อัพเดทบทบาทสำเร็จแล้ว!!");
      })
      .catch((err) => console.log(err));
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          จัดการผู้ใช้งาน
        </h1>

        {/* แสดง ScaleLoader ระหว่างโหลด */}
        {loading ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="#3498db" height={40} width={10} />
          </div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-center">
                  ลำดับ
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  สิทธิ์
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  สถานะ
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((el, i) => (
                <tr key={el.id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {i + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{el.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      className="border border-gray-300 rounded-md px-2 py-1 bg-white"
                      onChange={(e) =>
                        handleChangeUserRole(el.id, e.target.value)
                      }
                      value={el.role}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {el.enabled ? (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className={`px-3 py-1 rounded-md shadow-md mr-2 ${
                        el.enabled
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                      onClick={() =>
                        handleChangeUserStatus(el.id, el.enabled)
                      }
                    >
                      {el.enabled ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableUsers;
