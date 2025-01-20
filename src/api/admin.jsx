import axios from "axios";

// https://comdiy-api.vercel.app/api/admin/orders

export const getOrdersAdmin = async (token) => {
  // code body
  return axios.get("https://comdiy-api.vercel.app/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const changeOrderStatus = async (token, orderId, orderStatus) => {
  // code body
  return axios.put(
    "https://comdiy-api.vercel.app/api/admin/order-status",
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const getListAllUsers = async (token) => {
  // code body
  return axios.get("https://comdiy-api.vercel.app/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token,value) => {
  // code body
  return axios.post("https://comdiy-api.vercel.app/api/change-status",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token,value) => {
  // code body
  return axios.post("https://comdiy-api.vercel.app/api/change-role",value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = async (token, userId) => {
  try {
    const response = await axios.delete(`https://comdiy-api.vercel.app/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ส่ง token ที่ได้รับจากการ login
      },
    });
    return response.data; // ส่งข้อมูลการตอบกลับกลับไป
  } catch (error) {
    console.error("Error deleting user:", error.response || error.message);
    throw error; // ข้อผิดพลาดจะถูกโยนออกไปเพื่อให้เรียกใช้ catch ใน frontend
  }
};



