import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners"; // Import ScaleLoader for loading spinner

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false); // State for loading status

  useEffect(() => {
    getCategory();
    fetchProduct(token, id);
  }, [id, token]);

  const fetchProduct = async (token, id) => {
    setLoading(true); // Start loading
    try {
      const res = await readProduct(token, id);
      setForm(res.data);
    } catch (err) {
      console.log("Err fetch data", err);
      toast.error("ไม่สามารถดึงข้อมูลสินค้าได้");
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when submitting
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`แก้ไขข้อมูล ${res.data.title} สำเร็จ`);
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถแก้ไขสินค้าได้");
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif",
  };

  return (
    <div style={style}>
      <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-gray-700">แก้ไขข้อมูลสินค้า</h2>

          {loading ? (
            // Show the loading spinner if loading
            <div className="flex justify-center items-center">
              <ScaleLoader color="#3498db" loading={loading} size={150} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-2 text-gray-600">
                    ชื่อสินค้า
                  </label>
                  <input
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder="Title"
                    name="title"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-2 text-gray-600">
                    รายละเอียดสินค้า
                  </label>
                  <input
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder="Description"
                    name="description"
                  />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-2 text-gray-600">
                    ราคาสินค้า
                  </label>
                  <input
                    type="number"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder="Price"
                    name="price"
                  />
                </div>

                {/* Quantity */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-2 text-gray-600">
                    จำนวนสินค้า
                  </label>
                  <input
                    type="number"
                    className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder="Quantity"
                    name="quantity"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-600">
                  หมวดหมู่สินค้า
                </label>
                <select
                  className="border p-3 rounded focus:ring-2 focus:ring-blue-500"
                  name="categoryId"
                  onChange={handleOnChange}
                  required
                  value={form.categoryId}
                >
                  <option value="" disabled>
                    Please Select
                  </option>
                  {categories.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Upload */}
              <Uploadfile form={form} setForm={setForm} />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 transition duration-200"
              >
                แก้ไขสินค้า
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormEditProduct;
