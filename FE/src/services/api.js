import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Đảm bảo đúng cổng của Backend bạn đang chạy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động đính kèm Token (nếu có) vào mỗi yêu cầu gửi đi
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;