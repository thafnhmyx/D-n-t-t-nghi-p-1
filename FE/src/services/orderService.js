import api from './api';

const orderService = {
  // Tạo đơn hàng mới
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  // Lấy lịch sử đơn hàng của 1 user
  getOrdersByUserId: async (userId) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },
  // Tạo link thanh toán VNPAY
  createPaymentUrl: async (paymentData) => {
    const response = await api.post('/payments/create-url', paymentData);
    return response.data;
  }
};

export default orderService;