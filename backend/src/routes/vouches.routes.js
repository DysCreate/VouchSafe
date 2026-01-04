const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { createVouch, getEmployeeVouches } = require('../controllers/vouches.controller');

router.post('/create', auth, createVouch);
router.get('/employee/:employeeId', getEmployeeVouches);

module.exports = router;
