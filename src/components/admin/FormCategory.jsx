import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
  updateCategory,
} from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners"; // Import ScaleLoader for loading spinner
import Swal from "sweetalert2";
import "./../../../public/sweetalert2.css";

const FormCategory = () => {
  // State & Store
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null); // State for editing mode
  const [loading, setLoading] = useState(false); // Add loading state
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  // Fetch categories on mount
  useEffect(() => {
    if (token) {
      setLoading(true); // Start loading when fetching categories
      getCategory(token);
      setLoading(false); // Stop loading once categories are fetched
    }
  }, [token, getCategory]);

  // Handle Add/Edit Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please fill data");
    }
    setLoading(true);
    try {
      let res;
      if (editingId) {
        // Update category
        res = await updateCategory(token, editingId, { name });
        toast.success(`แก้ไขหมวด ${res.data.name} สำเร็จ!!!`);
        setEditingId(null); // Exit edit mode

        // Find the index of the category being edited and update its name
        const updatedCategories = categories.map((category) =>
          category.id === editingId
            ? { ...category, name: res.data.name }
            : category
        );
        useEcomStore.setState({ categories: updatedCategories }); // Update store with the new category list
      } else {
        // Create category
        res = await createCategory(token, { name });
        toast.success(`เพิ่มหมวด ${res.data.name} สำเร็จ!!!`);
        useEcomStore.setState((state) => ({
          categories: [...state.categories, res.data], // Add new category to the list
        }));
      }
      setName(""); // Clear input after action
    } catch (err) {
      console.log(err);
      toast.error("เกิดข้อผิดพลาดในการดำเนินการ");
    } finally {
      setLoading(false);
    }
  };

  // Handle Remove Category
  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "ยืนยัน",
      text: "คุณแน่ใจว่าต้องการลบหมวดหมู่นี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ปิด",
      reverseButtons: true,
      customClass: {
        title: "swal-title",
        popup: "swal-popup",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    });

    if (!result.isConfirmed) return; // ถ้าไม่กดยืนยัน ให้หยุดทำงาน

    setLoading(true);
    try {
      const res = await removeCategory(token, id);

      // ✅ แจ้งเตือนสำเร็จ โดยไม่มีปุ่ม OK และหายไปเอง
      Swal.fire({
        title: `ลบ ${res.data.name} สำเร็จ`,
        icon: "success",
        timer: 1500, // หายไปเองใน 1.5 วินาที
        showConfirmButton: false,
        customClass: { popup: "swal-popup" },
      });

      getCategory(token); // รีเฟรชรายการหมวดหมู่
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "เกิดข้อผิดพลาดในการลบหมวดหมู่",
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit Category
  const handleEdit = (category) => {
    setName(category.name); // Set current name to input
    setEditingId(category.id); // Set editing mode with category ID
  };

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="container mx-auto p-4 bg-white shadow-md rounded-md">
        <h1 className="text-lg font-bold mb-4">การจัดการหมวดหมู่</h1>

        {/* Add/Edit Category Form */}
        <form className="my-4 flex items-center gap-4" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            type="text"
            placeholder="Enter category name"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white text-sm p-2 rounded shadow-md hover:scale-105 hover:-translate-y-1 transition duration-200 whitespace-nowrap"
          >
            {editingId ? "Update Category" : "เพิ่มหมวดหมู่"}
          </button>
        </form>

        <hr />

        {/* Show Loading Spinner while fetching categories */}
        {loading ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="#3498db" loading={loading} size={150} />
          </div>
        ) : (
          <ul className="list-none mt-4">
            {categories.map((item, index) => (
              <li
                className="flex justify-between items-center my-2"
                key={index}
              >
                <span className="text-gray-700">{item.name}</span>
                <div className="flex gap-2 ">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white text-sm p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 transition duration-200"
                  >
                    แก้ไข
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white text-sm p-2 rounded-md shadow-md hover:scale-105 hover:-translate-y-1 transition duration-200"
                  >
                    ลบ
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormCategory;
