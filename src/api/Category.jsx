import axios from 'axios';

export const createCategory = async (token, form) => {
    return axios.post('https://comdiy-api.vercel.app/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const listCategory = async () => {
    return axios.get('https://comdiy-api.vercel.app/api/category');
};

export const removeCategory = async (token, id) => {
    return axios.delete(`https://comdiy-api.vercel.app/api/category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateCategory = async (token, id, data) => {
    return axios.put(`https://comdiy-api.vercel.app/api/category/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
};
