import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
import { ClipLoader } from "react-spinners";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(initialState);
  const [search, setSearch] = useState(""); // เพิ่ม state สำหรับคำค้นหา
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // อัปเดตค่า search เมื่อผู้ใช้กรอกข้อมูล
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // เริ่มโหลด
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct(token);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // เลิกโหลด
    }
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจที่จะลบใช่หรือไม่?")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success("ลบ สินค้าเรียบร้อยแล้ว");
        getProduct(token);
      } catch (err) {
        console.log(err);
      }
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const filteredProducts = products.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  const style = {
    fontFamily: "'Sarabun', sans-serif",
  };

  return (
    <div style={style}>
      <div className="container mx-auto p-4 bg-white shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4 flex-wrap items-start">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">เพิ่มข้อมูลสินค้า</label>

              <input
                className="border p-2 rounded"
                value={form.title}
                onChange={handleOnChange}
                placeholder="Title"
                name="title"
              />

              <br />
              <div>
              <button
  type="submit"
  className="mt-2 bg-blue-500 text-white p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 hover:duration-200 w-64"
>
  {loading ? (
    <ClipLoader size={20} color="white" loading={loading} />
  ) : (
    "เพิ่มสินค้า"
  )}
</button>
              </div>

              <br />
              {/* ฟอร์มค้นหาสินค้า (ย้ายมาไว้ใต้ปุ่มเพิ่มสินค้า) */}
              <div className="flex flex-col mb-4">
                <label className="font-semibold mb-2">ค้นหาสินค้า</label>
                <input
                  className="border p-2 rounded w-64"
                  value={search}
                  onChange={handleSearchChange} // เชื่อมโยงการค้นหากับ state
                  placeholder="ค้นหาสินค้า..."
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">รายละเอียดสินค้า</label>
              <input
                className="border p-2 rounded"
                value={form.description}
                onChange={handleOnChange}
                placeholder="Description"
                name="description"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">ราคาสินค้า</label>
              <input
                type="number"
                className="border p-2 rounded"
                value={form.price || ""}
                onChange={handleOnChange}
                placeholder="Price"
                name="price"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">จำนวนสินค้า</label>
              <input
                type="number"
                className="border p-2 rounded"
                value={form.quantity || ""}
                onChange={handleOnChange}
                placeholder="Quantity"
                name="quantity"
              />
            </div>
            <select
              className="border p-2 rounded mt-8"
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
            <hr />
            <Uploadfile form={form} setForm={setForm} />
            <hr />

            <table className="table-auto w-full border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300 text-center">
                  <th scope="col" className="px-4 py-2">
                    No.
                  </th>
                  <th scope="col" className="px-4 py-2">
                    รูปภาพ
                  </th>
                  <th scope="col" className="px-4 py-2">
                    ชื่อสินค้า
                  </th>
                  <th scope="col" className="px-4 py-2">
                    รายละเอียด
                  </th>
                  <th scope="col" className="px-4 py-2">
                    ราคา
                  </th>
                  <th scope="col" className="px-4 py-2">
                    จำนวน
                  </th>
                  <th scope="col" className="px-4 py-2 whitespace-nowrap">
                    จำนวนที่ขายได้
                  </th>
                  <th scope="col" className="px-4 py-2">
                    วันที่อัปเดต
                  </th>
                  <th scope="col" className="px-4 py-2">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition duration-200`}
                  >
                    <th
                      scope="row"
                      className="border-b border-gray-300 px-4 py-2"
                    >
                      {index + 1}
                    </th>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {item.images.length > 0 ? (
                        <img
                          className="w-24 h-24 rounded-lg shadow-md object-cover"
                          src={item.images[0].url}
                          alt={item.title}
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center shadow-sm text-gray-500">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {item.title}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {item.description}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 text-green-600 font-semibold whitespace-nowrap">
                      {numberFormat(item.price)} ฿
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {item.quantity}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      {item.sold}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 whitespace-nowrap">
                      {dateFormat(item.updatedAt)}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 flex justify-center gap-2">
                      <Link
                        to={`/admin/product/${item.id}`}
                        className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 hover:scale-105 transition duration-200"
                      >
                        <Pencil />
                      </Link>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 hover:scale-105 transition duration-200"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProduct;
