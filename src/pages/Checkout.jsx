// rafce

import React from "react";
import SummaryCard from "../components/card/SummaryCard";

const Checkout = () => {

  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
    <div>
      <SummaryCard />
    </div>
    </div>
  );
};

export default Checkout;
