const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { createVouch } = require('../controllers/vouches.controller');

router.post('/create', auth, createVouch);

module.exports = router;
