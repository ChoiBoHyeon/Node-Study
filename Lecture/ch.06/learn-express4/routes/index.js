const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    console.log('Index 라우터 진입');
    res.send('Hello, Express');
});

module.exports = router;