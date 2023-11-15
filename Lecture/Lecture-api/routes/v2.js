const express = require('express');

const { verifyToken,apiLimiter } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v2');

const router = express.Router();

// POST /v1/token
router.post('/token', apiLimiter, createToken);

// POST /v1/test
router.get('/test', verifyToken, apiLimiter, tokenTest);

// GET /v1/posts/my
router.get('/posts/my', verifyToken, apiLimiter, getMyPosts);

// GET /v1/posts/hashtag/:title
router.get('/posts/hashtag/:title', verifyToken, apiLimiter, getPostsByHashtag);

module.exports = router;