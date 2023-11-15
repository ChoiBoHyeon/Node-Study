const express = require('express');

const { verifyToken,apiLimiter, corsWhenDomainMatches } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v2');
const cors = require('cors');

const router = express.Router();

// CORS Error 해결
router.use(corsWhenDomainMatches);

/* // 직접 해결
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
})
*/

// POST /v1/token
router.post('/token', apiLimiter, createToken);

// POST /v1/test
router.get('/test', verifyToken, apiLimiter, tokenTest);

// GET /v1/posts/my
router.get('/posts/my', verifyToken, apiLimiter, getMyPosts);

// GET /v1/posts/hashtag/:title
router.get('/posts/hashtag/:title', verifyToken, apiLimiter, getPostsByHashtag);

module.exports = router;