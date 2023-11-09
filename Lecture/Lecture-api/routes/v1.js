const express = require('express');
const { verifyToken } = require('../middlewares');
const { createToken, tokenTest } = require('../controllers/v1');

const router = express.Router();

// 토큰만들기
router.post('/token', createToken);
router.get('/test', verifyToken, tokenTest);

module.exports = router;