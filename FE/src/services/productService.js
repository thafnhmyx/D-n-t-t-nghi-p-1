import api from './api';

const productService = {
  // Lấy danh sách giày (có lọc theo brand, category, sort)
  getAllProducts: async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  // Lấy chi tiết 1 đôi giày
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  // Lấy tất cả danh mục giày
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  // Lấy tất cả thương hiệu giày
  getBrands: async () => {
    const response = await api.get('/brands');
    return response.data;
  }
};

export default productService;