const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');

const router = express.Router();


router.use((req, res, next) => {
    res.locals.user =  req.user;
    res.locals.follwerCount = 0;
    res.locals.follwingCount = 0;
    res.locals.follwingIdList = [];
    next();
})

router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports = router;
