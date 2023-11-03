const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');



// POST /user/:id/follow
try {
    router.post('/:id/follow', isLoggedIn, follow)
} catch(error){
    console.log('router-user error');
    next(error);
}

module.exports = router;