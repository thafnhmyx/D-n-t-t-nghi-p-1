import api from './api';

const userService = {
  // Lấy thông tin cá nhân
  getProfile: async (id) => {
    const response = await api.get(`/users/profile/${id}`);
    return response.data;
  },
  // Lấy danh sách địa chỉ đã lưu
  getUserAddresses: async (userId) => {
    const response = await api.get(`/addresses/user/${userId}`);
    return response.data;
  },
  // Thêm địa chỉ mới
  addAddress: async (addressData) => {
    const response = await api.post('/addresses', addressData);
    return response.data;
  }
};

export default userService;