import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
import ScaleLoader from "react-spinners/ScaleLoader";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่มสถานะ loading

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    setLoading(true); // เริ่มโหลด
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
        setLoading(false); // จบโหลด
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // จบโหลด แม้เกิดข้อผิดพลาด
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then(() => {
        toast.success("อัปเดตสถานะสำเร็จ!!!");
        handleGetOrder(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "กำลังเตรียมพัสดุ":
        return "bg-gray-200";
      case "กำลังจัดส่ง":
        return "bg-blue-200";
      case "จัดส่งสำเร็จ":
        return "bg-green-200";
      case "จัดส่งไม่สำเร็จ":
        return "bg-red-200";
      default:
        return "bg-gray-100";
    }
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">จัดการคำสั่งซื้อ</h1>

        {/* แสดงตัวโหลดระหว่างโหลด */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ScaleLoader color="#3498db" height={40} width={10} />
          </div>
        ) : (
          <div>
            <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300 text-center">
                  <th className="px-4 py-2">ลำดับ</th>
                  <th className="px-4 py-2">ผู้ใช้งาน</th>
                  <th className="px-4 py-2">วันที่</th>
                  <th className="px-4 py-2">สินค้า</th>
                  <th className="px-4 py-2">รวม</th>
                  <th className="px-4 py-2">สถานะ</th>
                  <th className="px-4 py-2">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="border-b border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 text-left">
                      <p className="font-semibold">{item.orderedBy.email}</p>
                      <p className="text-sm text-gray-500">
                        {item.orderedBy.address}
                      </p>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {dateFormat(item.createdAt)}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 text-left">
                      <ul className="list-disc pl-4">
                        {item.products?.map((product, index) => (
                          <li key={index}>
                            <span className="font-medium">
                              {product.product.title}
                            </span>{" "}
                            <span className="text-sm text-gray-500">
                              ({product.count} x{" "}
                              {numberFormat(product.product.price)})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 font-semibold text-green-600">
                      {numberFormat(item.cartTotal)} ฿
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      <span
                        className={`${getStatusColor(
                          item.orderStatus
                        )} px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {item.orderStatus}
                      </span>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      <select
                        value={item.orderStatus}
                        onChange={(e) =>
                          handleChangeOrderStatus(token, item.id, e.target.value)
                        }
                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="กำลังเตรียมพัสดุ">กำลังเตรียมพัสดุ</option>
                        <option value="กำลังจัดส่ง">กำลังจัดส่ง</option>
                        <option value="จัดส่งสำเร็จ">จัดส่งสำเร็จ</option>
                        <option value="จัดส่งไม่สำเร็จ">จัดส่งไม่สำเร็จ</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableOrders;
