import React, { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";
import provincesData from "../../data/thai_provinces.json";
import amphoesData from "../../data/thai_amphures.json";
import districtsData from "../../data/thai_tambons.json";
import { DotLoader } from "react-spinners";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [amphoes, setAmphoes] = useState([]);
  const [selectedAmphoe, setSelectedAmphoe] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart(token);
    fetchProvinces();
  }, [token]);

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        if (res.data && res.data.cartTotal !== undefined) {
          setProducts(res.data.products);
          setCartTotal(res.data.cartTotal);
        } else {
          setCartTotal(0);
        }
      })
      .catch((err) => {
        console.log("Error fetching cart:", err);
      });
  };

  const fetchProvinces = () => {
    const provinceList = provincesData.map((item) => ({
      id: item.id,
      name: item.name_th || item.name,
    }));
    setProvinces(provinceList);
  };

  const fetchAmphoes = (provinceName) => {
    const amphoeList = amphoesData
      .filter(
        (item) =>
          item.province_id ===
          provincesData.find((p) => p.name_th === provinceName)?.id
      )
      .map((item) => ({
        id: item.id,
        name: item.name_th || item.name,
      }));
    setAmphoes(amphoeList);
    setSelectedAmphoe("");
    setDistricts([]);
    setSelectedDistrict("");
  };

  const fetchDistricts = (amphoeName) => {
    const districtList = districtsData
      .filter(
        (item) =>
          item.amphure_id ===
          amphoesData.find((a) => a.name_th === amphoeName)?.id
      )
      .map((item) => ({
        id: item.id,
        name: item.name_th || item.name,
      }));
    setDistricts(districtList);
    setSelectedDistrict("");
  };

  const hdlSaveAddress = () => {
    if (!address || !selectedProvince || !selectedAmphoe || !selectedDistrict) {
      return toast.warning("กรุณากรอกที่อยู่และเลือกจังหวัด/อำเภอ/ตำบล");
    }
    const fullAddress = `${address}, ${selectedDistrict}, ${selectedAmphoe}, ${selectedProvince}`;

    setLoading(true); // Start loading
    saveAddress(token, fullAddress)
      .then((res) => {
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log("Error saving address:", err);
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่ก่อน");
    }
    navigate("/user/payment");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Address Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-md border shadow-md space-y-4">
          <h1 className="font-bold text-2xl text-gray-700">
            ที่อยู่ในการจัดส่ง
          </h1>
          <textarea
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="กรุณากรอกที่อยู่และเบอร์โทร"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />

          {/* Dropdown for Province */}
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setSelectedProvince(e.target.value);
              fetchAmphoes(e.target.value);
            }}
            value={selectedProvince}
          >
            <option value="">เลือกจังหวัด</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>

          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setSelectedAmphoe(e.target.value);
              fetchDistricts(e.target.value);
            }}
            value={selectedAmphoe}
            disabled={!selectedProvince}
          >
            <option value="">เลือกเขต/อำเภอ</option>
            {amphoes.map((amphoe) => (
              <option key={amphoe.id} value={amphoe.name}>
                {amphoe.name}
              </option>
            ))}
          </select>

          {/* Dropdown for District */}
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSelectedDistrict(e.target.value)}
            value={selectedDistrict}
            disabled={!selectedAmphoe}
          >
            <option value="">เลือกแขวง/ตำบล</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          <button
  onClick={hdlSaveAddress}
  className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
  disabled={loading} // Disable button when loading
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <DotLoader color="#ffffff" size={20} />
      <span>กำลังบันทึก...</span>
    </span>
  ) : (
    <span>บันทึกที่อยู่</span>
  )}
</button>
        </div>

        {/* Right - Order Summary Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-md border shadow-md space-y-4">
          <h1 className="font-bold text-2xl text-gray-700">คำสั่งซื้อของคุณ</h1>
          <div className="space-y-4">
            {products?.map((item, index) => {
              const productImages = item.product.images || [];
              return (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-shrink-0">
                    {productImages.length > 0 ? (
                      <img
                        src={productImages[0].url}
                        alt={item.product.title || "รูปภาพสินค้า"}
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-md border"></div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      จำนวน: {item.count} x {numberFormat(item.product.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-red-500 font-semibold">
                      {numberFormat(item.count * item.product.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-700">ค่าจัดส่ง:</p>
              <p className="text-gray-700">0.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">ส่วนลด:</p>
              <p className="text-gray-700">0.00</p>
            </div>
          </div>
          <hr className="border-t border-gray-300" />
          <div className="flex justify-between font-semibold">
            <p className="text-lg">ยอดรวมสุทธิ:</p>
            <p className="text-red-500 text-xl">
              {numberFormat(cartTotal)} <span className="text-black">บาท</span>
            </p>
          </div>
          <hr className="border-t border-gray-300" />
          <button
            onClick={hdlGoToPayment}
            className="w-full bg-green-500 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            ดำเนินการชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
