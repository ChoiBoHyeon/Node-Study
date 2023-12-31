const User = require('../models/user');
const { follow } = require('../services/user');

exports.follow = async (req, res, next) => {
  try {
    const result = await follow(req.user.id, req.params.id);
    if (result === 'ok') { // req.user.id가 followerId, req.params.id가 followingId
      res.send('success');
    } else if (result === 'no user') {
        res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};