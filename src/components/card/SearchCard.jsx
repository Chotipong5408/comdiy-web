import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";
import Fuse from "fuse.js";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([1000, 100000]);
  const [ok, setOk] = useState(false);

  const fuse = new Fuse(products, {
    keys: ["name"], // หาคำจากชื่อสินค้า
    includeScore: true, // แสดงคะแนนที่ได้จากการจับคู่
    threshold: 0.3, // ความยืดหยุ่นในการค้นหา (ค่าต่ำคือแม่นยำสูงขึ้น)
  });

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        const results = fuse.search(text); // ทำการค้นหาด้วย Fuse.js
        actionSearchFilters({ query: results.map((result) => result.item) });
      } else {
        getProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  const handleCheck = (e) => {
    const inCheck = e.target.value; 
    const inState = [...categorySelected]; 
    const findCheck = inState.indexOf(inCheck); 

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>

      {/* ค้นหาจากข้อความ */}
      <div className="flex items-center border rounded-md w-full mb-4 px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500">
        <i className="bi bi-search text-gray-400 mr-2"></i>
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="ค้นหาสินค้า...."
          className="w-full focus:outline-none"
        />
      </div>

      <hr className="mb-4" />

      {/* ค้นหาจากหมวดหมู่ */}
      <div>
        <h2 className="font-semibold mb-2"><i className="bi bi-grid-fill"></i> หมวดหมู่สินค้า</h2>
        <div className="space-y-2">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input 
                onChange={handleCheck} 
                value={item.id} 
                type="checkbox" 
                className="form-checkbox text-blue-500"
              />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-4" />

      {/* ค้นหาจากราคา */}
      <div>
        <h2 className="font-semibold mb-2">ค้นหาราคา</h2>
        <div>
          <div className="flex justify-between mb-2">
            <span>Min : {numberFormat(price[0])}</span>
            <span>Max : {numberFormat(price[1])}</span>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={100000}
            defaultValue={[0, 0]}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
