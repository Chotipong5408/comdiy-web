// rafce
import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import "./App.css"; 


const App = () => {
  // Javascript


  const style = {
    fontFamily: "'Sarabun', sans-serif", // เปลี่ยนฟอนต์ที่ต้องการ
  };

  return (
    <>
     <ToastContainer toastStyle={style}/>
     <AppRoutes />
     
    </>
  )
}

export default App