import React, { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="flex">
        {/* SearchBar */}
        <div className="w-1/4 p-4 bg-gray-100 h-screen">
          <SearchCard />
        </div>

        {/* Product */}
        <div className="w-full p-4 overflow-y-auto max-h-screen">
          <div className="flex flex-wrap gap-4">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
