const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Mở cửa API nhận request từ Frontend (Checkout.jsx)
router.post('/create-url', paymentController.createPaymentUrl);

module.exports = router;