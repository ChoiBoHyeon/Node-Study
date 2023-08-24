const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => {
    console.log('User 라우터 진입');
    res.send('Hello, User');
});

module.exports = router;