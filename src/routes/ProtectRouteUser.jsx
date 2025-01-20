import React, { useState, useEffect } from 'react'
import useEcomStore from '../store/ecom-store'
import { currentUser } from '../api/auth'
import LoadingToRedirect from './LoadingToRedirect'


const ProtectRouteUser = ({ element }) => {
    const [ok, setOk] = useState(false)
    const user = useEcomStore((state) => state.user)
    const token = useEcomStore((state) => state.token)

    useEffect(() => {
        if (user && token) {
            // send to back
            currentUser(token)
                .then((res) => {
                    console.log("User authenticated:", res);  // ตรวจสอบผลการตรวจสอบ
                    setOk(true)
                })
                .catch((err) => {
                    console.log("Authentication failed:", err);  // ตรวจสอบถ้าผิดพลาด
                    setOk(false)
                })
        }
    }, [user, token])

    console.log("Ok status:", ok); // ดูสถานะ ok ว่ามีค่าหรือไม่

    return ok ? element : <LoadingToRedirect />
}


export default ProtectRouteUser