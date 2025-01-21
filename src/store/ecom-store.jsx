import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listProduct, searchFilters } from "../api/product";
import _ from "lodash";

const ecomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      categories: [],
      products: [],
      carts: [],
    });
  },

  actionAddtoCart: (product) => {
    const carts = get().carts;
    const updatedCart = [...carts, { ...product, count: 1 }];
    // ลบรายการที่ซ้ำกันออก
    const uniqueCart = _.uniqBy(updatedCart, "id");
    set({ carts: uniqueCart });
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },

  actionRemoveProduct: (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },

  getTotalPrice: () => {
    return get().carts.reduce((total, item) => total + item.price * item.count, 0);
  },

  actionLogin: async (form) => {
    try {
      const res = await axios.post("https://comdiy-api.vercel.app/api/login", form);
      set({
        user: res.data.payload,
        token: res.data.token,
      });
      return res;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  },

  getCategory: async () => {
    try {
      const res = await listCategory();
      set({ categories: res.data });
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  },

  getProduct: async (count = 1000) => {
    try {
      const res = await listProduct(count);
      if (res.data && Array.isArray(res.data)) {
        set({ products: res.data });
      } else {
        console.error("Unexpected product data:", res.data);
        set({ products: [] });
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      set({ products: [] }); // ป้องกันข้อมูลเป็น undefined
    }
  },

  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      if (res.data && Array.isArray(res.data)) {
        set({ products: res.data });
      } else {
        console.error("Unexpected search result:", res.data);
        set({ products: [] });
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  },

  clearCart: () => set({ carts: [] }),
});

const usePersist = {
  name: "ecom-store",
  storage: createJSONStorage(() => localStorage),
};

const useEcomStore = create(persist(ecomStore, usePersist));

export default useEcomStore;
