const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile } = require('../controllers/page');

router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.follwerCount = 0;
    res.locals.follwingCount = 0;
    res.locals.follwingIdList = [];
    next();
})

router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports = router;
