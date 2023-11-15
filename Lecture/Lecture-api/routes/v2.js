const express = require('express');

const { verifyToken,apiLimiter } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v2');

const router = express.Router();

// POST /v1/token
router.post('/token', apiLimiter, createToken);

// POST /v1/test
router.get('/test', apiLimiter, verifyToken, tokenTest);

// GET /v1/posts/my
router.get('/posts/my', apiLimiter, verifyToken, getMyPosts);

// GET /v1/posts/hashtag/:title
router.get('/posts/hashtag/:title', apiLimiter, verifyToken, getPostsByHashtag);

module.exports = router;