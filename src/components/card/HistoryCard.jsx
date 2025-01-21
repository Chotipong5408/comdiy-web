import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";
import { ScaleLoader } from "react-spinners";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่ม state เพื่อตรวจสอบการโหลด

  useEffect(() => {
    hdlGetOrders(token);
  }, [token]);

  const hdlGetOrders = (token) => {
    setLoading(true); // เริ่มโหลด
    getOrders(token)
      .then((res) => {
        console.log(res.data.orders);
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // หยุดโหลดเมื่อเสร็จสิ้น
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
    fontFamily: "'Sarabun', sans-serif",
  };

  return (
    <div style={style}>
      <br />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          ประวัติการสั่งซื้อ
        </h1>
        {/* แสดงตัวโหลดระหว่างรอข้อมูล */}
        {loading ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="#3b82f6" />
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">ไม่มีประวัติคำสั่งซื้อ</p>
        ) : (
          /* Loop Orders */
          <div>
            {orders?.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">วันที่สั่งซื้อ</p>
                    <p className="font-bold text-lg">
                      {dateFormat(item.updatedAt)}
                    </p>
                    <div className="inline-flex items-center">
                      <div className="w-[64px] h-[64px]">
                        <svg
                          xmlns="https://www.w3.org/2000/svg"
                          width="45"
                          height="50"
                          viewBox="0 0 64 64"
                          fill="none"
                          className="injected-svg"
                          data-src="/assets/images/icons/truck.svg"
                          xmlnsXlink="https://www.w3.org/1999/xlink"
                        >
                          <g clipPath="url(#clip0-15)">
                            <path
                              d="M48.3361 38.0503C43.8877 38.0503 40.2689 41.6692 40.2689 46.1175C40.2689 50.5659 43.8877 54.1848 48.3361 54.1848C52.7852 54.1848 56.4034 50.5659 56.4034 46.1175C56.4034 41.6692 52.7845 38.0503 48.3361 38.0503ZM48.3361 50.1512C46.1116 50.1512 44.3025 48.342 44.3025 46.1175C44.3025 43.893 46.1116 42.0839 48.3361 42.0839C50.5606 42.0839 52.3697 43.893 52.3697 46.1175C52.3697 48.3422 50.5606 50.1512 48.3361 50.1512Z"
                              fill="#3b83f6"
                            ></path>
                            <path
                              d="M20.7731 38.0503C16.3247 38.0503 12.7059 41.6692 12.7059 46.1175C12.7059 50.5659 16.3247 54.1848 20.7731 54.1848C25.2215 54.1848 28.8404 50.5659 28.8404 46.1175C28.8404 41.6692 25.2215 38.0503 20.7731 38.0503ZM20.7731 50.1512C18.5486 50.1512 16.7395 48.342 16.7395 46.1175C16.7395 43.893 18.5486 42.0839 20.7731 42.0839C22.997 42.0839 24.8067 43.893 24.8067 46.1175C24.8067 48.3422 22.9976 50.1512 20.7731 50.1512Z"
                              fill="#3b83f6"
                            ></path>
                            <path
                              d="M53.7687 14.9597C53.4259 14.2787 52.7287 13.8491 51.9664 13.8491H41.3445V17.8827H50.7226L56.2144 28.8058L59.8191 26.9933L53.7687 14.9597Z"
                              fill="#3b83f6"
                            ></path>
                            <path
                              d="M42.2858 44.168H27.0253V48.2016H42.2858V44.168Z"
                              fill="#3b83f6"
                            ></path>
                            <path
                              d="M14.7227 44.168H7.73117C6.61717 44.168 5.71442 45.0708 5.71442 46.1847C5.71442 47.2987 6.61729 48.2015 7.73117 48.2015H14.7228C15.8368 48.2015 16.7395 47.2986 16.7395 46.1847C16.7395 45.0707 15.8367 44.168 14.7227 44.168Z"
                              fill="#3b83f6"
                            ></path>
                            <path
                              d="M63.5765 31.8384L59.6095 26.7292C59.2284 26.2371 58.6402 25.9493 58.0169 25.9493H43.3614V11.8317C43.3614 10.7177 42.4585 9.81494 41.3447 9.81494H7.73117C6.61717 9.81494 5.71442 10.7178 5.71442 11.8317C5.71442 12.9456 6.61729 13.8484 7.73117 13.8484H39.3278V27.9661C39.3278 29.0801 40.2307 29.9828 41.3445 29.9828H57.0293L59.9664 33.7663V44.1677H54.3865C53.2725 44.1677 52.3698 45.0706 52.3698 46.1844C52.3698 47.2984 53.2727 48.2012 54.3865 48.2012H61.9832C63.0972 48.2012 63.9999 47.2983 64 46.1844V33.0754C64 32.6277 63.8508 32.1921 63.5765 31.8384Z"
                              fill="#3b83f6"
                            ></path>
                            <path
                              d="M14.5883 33.9497H5.31088C4.19688 33.9497 3.29413 34.8526 3.29413 35.9665C3.29413 37.0805 4.197 37.9832 5.31088 37.9832H14.5881C15.7021 37.9832 16.6049 37.0803 16.6049 35.9665C16.605 34.8526 15.7021 33.9497 14.5883 33.9497Z"
                              fill="#3b83f6"
                            ></path>
                            <path
                              d="M19.2269 26.0166H2.01675C0.902875 26.0166 0 26.9195 0 28.0335C0 29.1475 0.902875 30.0502 2.01675 30.0502H19.2269C20.3409 30.0502 21.2436 29.1474 21.2436 28.0335C21.2436 26.9196 20.3409 26.0166 19.2269 26.0166Z"
                              fill="#3b83f6"
                            ></path>
                            <path
                              d="M22.521 18.084H5.31088C4.19688 18.084 3.29413 18.9869 3.29413 20.1007C3.29413 21.2147 4.197 22.1175 5.31088 22.1175H22.521C23.635 22.1175 24.5378 21.2146 24.5378 20.1007C24.5379 18.9869 23.635 18.084 22.521 18.084Z"
                              fill="#3b83f6"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0-15">
                              <rect width="64" height="64" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <span className="text-lg">
                        จะได้รับสินค้าภายใน 2-3 วัน
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`${getStatusColor(
                        item.orderStatus
                      )} px-3 py-1 rounded-full font-semibold text-sm`}
                    >
                      {item.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-semibold">
                          สินค้า
                        </th>
                        <th className="py-2 px-4 text-left text-sm font-semibold">
                          ราคา
                        </th>
                        <th className="py-2 px-4 text-left text-sm font-semibold">
                          จำนวน
                        </th>
                        <th className="py-2 px-4 text-left text-sm font-semibold">
                          รวม
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.products?.map((product, index) => {
                        const productImages = product.product.images || []; // handle images safely
                        return (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            {/* รูปภาพสินค้า */}
                            <td className="py-2 px-4">
                              <div className="flex flex-col items-start">
                                {" "}
                                {/* ใช้ items-start เพื่อให้ชิดซ้าย */}
                                {productImages.length > 0 ? (
                                  <img
                                    src={productImages[0].url} // ใช้ URL ของรูปภาพ
                                    alt={
                                      product.product.title || "รูปภาพสินค้า"
                                    }
                                    className="w-32 h-32 object-cover rounded mb-2" // ขยายขนาดรูปภาพและเพิ่มระยะห่างข้างล่าง
                                  />
                                ) : (
                                  <div className="w-32 h-32 bg-gray-300 rounded mb-2" />
                                )}
                                <span className="text-sm font-semibold text-left">
                                  {product.product.title}
                                </span>{" "}
                                {/* ชื่อสินค้าอยู่ด้านล่างรูป */}
                              </div>
                            </td>
                            {/* ราคา */}
                            <td className="py-2 px-4">
                              {numberFormat(product.product.price)}
                            </td>
                            {/* จำนวน */}
                            <td className="py-2 px-4">{product.count}</td>
                            {/* รวม */}
                            <td className="py-2 px-4">
                              {numberFormat(
                                product.count * product.product.price
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Order Total */}
                <div className="mt-4 text-right">
                  <p className="text-lg font-semibold text-black">ราคาสุทธิ</p>
                  <p className="text-xl font-bold text-blue-500">
                    {numberFormat(item.cartTotal)}{" "}
                    <span className="text-black text-sm">บาท</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default HistoryCard;
