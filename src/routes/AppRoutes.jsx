import React, { Suspense, lazy, useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // สำหรับ Loading Indicator

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Shop = lazy(() => import('../pages/Shop'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Layout = lazy(() => import('../layouts/Layout'));
const LayoutAdmin = lazy(() => import('../layouts/LayoutAdmin'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Product = lazy(() => import('../pages/admin/Product'));
const Category = lazy(() => import('../pages/admin/Category'));
const Manage = lazy(() => import('../pages/admin/Manage'));
const LayoutUser = lazy(() => import('../layouts/LayoutUser'));
const HomeUser = lazy(() => import('../pages/user/HomeUser'));
const ProtectRouteUser = lazy(() => import('./ProtectRouteUser'));
const ProtectRouteAdmin = lazy(() => import('./ProtectRouteAdmin'));
const EditProduct = lazy(() => import('../pages/admin/EditProduct'));
const Payment = lazy(() => import('../pages/user/Payment'));
const ManageOrders = lazy(() => import('../pages/admin/ManageOrders'));
const History = lazy(() => import('../pages/user/History')); // ตรวจสอบว่ามีการ import หน้านี้
const Aboutus = lazy(() => import('../components/home/Aboutus'));
const ProfileStatistics = lazy(() => import('../components/home/ProfileStatistics'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'shop', element: <Shop /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <Checkout /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'aboutus', element: <Aboutus /> },
            { path: 'profileStatistics', element: <ProfileStatistics /> },
        ]
    },
    {
        path: '/admin',
        element: <ProtectRouteAdmin element={<LayoutAdmin />} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'category', element: <Category /> },
            { path: 'product', element: <Product /> },
            { path: 'product/:id', element: <EditProduct /> },
            { path: 'manage', element: <Manage /> },
            { path: 'orders', element: <ManageOrders /> },
        ]
    },
    {
        path: '/user',
        element: <ProtectRouteUser element={<LayoutUser />} />,
        children: [
            { index: true, element: <HomeUser /> },
            { path: 'payment', element: <Payment /> },
            { path: 'history', element: <History /> },
        ]
    }
]);

const AppRoutes = () => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false); // ซ่อน Loading หลังจาก 2 วินาที
        }, 800); // ระยะเวลา Loading (2 วินาที)

        return () => clearTimeout(timer); // เคลียร์ timer เมื่อ component ถูก unmount
    }, []);

    return (
        <>
            {showLoader ? (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    <ClipLoader color="#3498db" size={80} />
                </div>
            ) : (
                <Suspense
                    fallback={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100vh',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            <ClipLoader color="#3498db" size={80} />
                        </div>
                    }
                >
                    <RouterProvider
                        router={router}
                        future={{
                            v7_startTransition: true, // เปิดใช้ฟีเจอร์ล่วงหน้า
                            v7_relativeSplatPath: true, // เปิดใช้งานการแก้ไข splat routes ล่วงหน้า
                        }}
                    />
                </Suspense>
            )}
        </>
    );
};

export default AppRoutes;
