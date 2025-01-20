import React from "react";
import "./Footer.css";

const Footer = () => {
  const style = {
    fontFamily: "'Sarabun', sans-serif", // กำหนดฟอนต์ที่ต้องการ
  };

  return (
    <>
      <div style={style}>
        <div>
          <footer className="footer">
            <div className="column">
              <div className="logo">
                COM<span>DIY</span>&nbsp;<i className="bi bi-pc-display"></i>
              </div>
              <p>
                ถ้าคุณหลงใหลในคอมพิวเตอร์ COMDIY คือเพื่อนคู่ใจของคุณเราจำหน่ายอุปกรณ์คอมพิวเตอร์ ฮาร์ดแวร์คอมพิวเตอร์ เกมมิ่งเกียร์
                ในงบประมาณที่คุณเลือกได้เองสร้างสรรค์คอมพิวเตอร์ในแบบของคุณได้ง่ายๆ ที่ COMDIY
              </p>
            </div>

            <div className="column">
              <h3>เกี่ยวกับเรา</h3>
              <p>
                <a href="/profileStatistics">ติดต่อเรา</a>
              </p>
              <p>
                <a href="/aboutus">เกี่ยวกับเรา</a>
              </p>
            </div>
            <div className="column">
              <h3>บริการลูกค้า</h3>
              <p>
                <a href="/register">สร้างบัญชี</a>
              </p>
              <p>
                <a href="/login">ลงชื่อเข้าใช้</a>
              </p>
              <p>
                <a href="/user/history">
                  ประวัติการสั่งซื้อ
                </a>
              </p>
            </div>
            <div className="column">
              <h3>ติดต่อเรา</h3>
              <p>Comdiy IT System Co., Ltd.</p>
              <p>โทรศัพท์: 02 123 4567</p>
              <p>อีเมล: info@comdiy.com</p>
              <div className="social-icons">
                <a href="#">{/* <i className="bi bi-facebook"></i> */}</a>
                <a href="#">
                  <i className="fab fa-line"></i>
                </a>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="#">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </footer>
          <div className="footer-bottom">
            <p>Copyright © 2024 www.comdiy.com All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
