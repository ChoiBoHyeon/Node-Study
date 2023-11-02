const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/follow
try {
    router.post('/:id/follow', isLoggedIn, follow)
} catch(error){
    console.log('router-user error');
    next(error);
}


module.exports = router;