import React from "react";

const AboutUs = () => {
  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <div style={style}>
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-12 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">เกี่ยวกับเรา</h1>
          <p className="text-lg text-gray-600 mt-2">
            ถ้าคุณหลงใหลในคอมพิวเตอร์ COMDIY คือเพื่อนคู่ใจของคุณ
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white max-w-3xl mx-auto mt-8 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            COMDIY ร้านจำหน่ายอุปกรณ์คอมพิวเตอร์
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            เราพร้อมที่จะแนะนำและดูแลคุณ วางงบประมาณ ซื้ออุปกรณ์คอมพิวเตอร์ อุปกรณ์เสริม
            และอุปกรณ์เกมมิ่งเกียร์ รับประกันคุณภาพ
            บริการขายอุปกรณ์คอมพิวเตอร์ตามการใช้งานและงบประมาณที่คุณเลือกได้เอง
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-blue-700 max-w-3xl mx-auto mt-8 p-6 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-3xl font-bold">3 ปี+</h2>
          <p className="text-lg mt-2">
            ให้บริการด้วยความเชี่ยวชาญและประสบการณ์
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white max-w-3xl mx-auto mt-8 p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 leading-relaxed">
            สำหรับใครที่กำลังมองหาอุปกรณ์คอมพิวเตอร์แบบมือหนึ่งที่เหมาะกับความต้องการของคุณ
            ไม่ว่าจะเป็นการซื้อสินค้า หรือการปรึกษาเรื่องการเลือกอุปกรณ์
            เรามีทีมงานที่พร้อมให้คำแนะนำ และช่วยเหลือคุณในทุกๆ ด้าน
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            เรายินดีให้คำปรึกษา รับประกันบริการ และเปิดขายมาเกินกว่า 3 ปี!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
