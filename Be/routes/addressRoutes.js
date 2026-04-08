const express = require('express');
const router = express.Router();
const { addAddress, getMyAddresses } = require('../controllers/addressController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addAddress);
router.get('/', protect, getMyAddresses);

module.exports = router;