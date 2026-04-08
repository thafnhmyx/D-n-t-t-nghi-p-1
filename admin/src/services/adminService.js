import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const adminService = {
  // --- NHÓM 1: BRAND & CATEGORY ---
  getBrands: () => axios.get(`${API_URL}/brands`),
  getCategories: () => axios.get(`${API_URL}/categories`),
  addBrand: (name) => axios.post(`${API_URL}/brands`, { name }),
  addCategory: (name) => axios.post(`${API_URL}/categories`, { name }),

  // --- NHÓM 2: VARIANT (SIZE/COLOR/QUANTITY) ---
  // Lấy biến thể theo ID sản phẩm
  getProductVariants: (productId) => axios.get(`${API_URL}/products/${productId}/variants`),
  
  // Thêm biến thể mới (Chọn Size/Color)
  addVariant: (productId, data) => axios.post(`${API_URL}/products/${productId}/variants`, data),
  
  // CẬP NHẬT SỐ LƯỢNG (Chỉ sửa quantity, không sửa size/color theo đề cô cho)
  updateVariantQty: (variantId, quantity) => axios.put(`${API_URL}/variants/${variantId}`, { quantity }),
  
  deleteVariant: (variantId) => axios.delete(`${API_URL}/variants/${variantId}`),

  // --- NHÓM 3: PRODUCT ---
  getProducts: () => axios.get(`${API_URL}/products`),
  getProductById: (id) => axios.get(`${API_URL}/products/${id}`),
  
  // Dùng FormData vì có gửi ảnh
  addProduct: (formData) => axios.post(`${API_URL}/products`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  updateProduct: (id, formData) => axios.put(`${API_URL}/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  deleteProduct: (id) => axios.delete(`${API_URL}/products/${id}`),

  // --- NHÓM 4: USER & ORDER ---
  getUsers: () => axios.get(`${API_URL}/users`),
  getOrders: () => axios.get(`${API_URL}/orders`),
  
  // Cập nhật trạng thái đơn hàng (Đang xử lý -> Đã giao)
  updateOrderStatus: (orderId, status) => axios.put(`${API_URL}/orders/${orderId}`, { status }),
  
  // Thống kê cho Dashboard
  getStatistics: () => axios.get(`${API_URL}/admin/statistics`)
};

export default adminService;