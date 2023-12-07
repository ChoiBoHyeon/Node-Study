const { Op } = require('sequelize');
const { Good, Auction, User, sequelize } = require('../models');
const sechdule = require('node-schedule');

exports.renderMain = async (req, res, next) => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 어제 시간
    const goods = await Good.findAll({ 
      where: { SoldId: null, createdAt: { [Op.gte]: yesterday } },
    });
    res.render('main', {
      title: 'NodeAuction',
      goods,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderJoin = (req, res) => {
  res.render('join', {
    title: '회원가입 - NodeAuction',
  });
};

exports.renderGood = (req, res) => {
  res.render('good', { title: '상품 등록 - NodeAuction' });
};

exports.createGood = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const good = await Good.create({
      OwnerId: req.user.id,
      name,
      img: req.file.filename,
      price,
    });
    const end = new Date();
    end.setDate(end.getDate() + 1);
    const job = sechdule.scheduleJob(end, async() => {
      const success = await Auction.findOne({
        where: { GoodId: good.id },
        order: [['bid', 'DESC']],
      });
      await good.setSold(success.UserId);
      await User.update({
        money: sequelize.literal(`money - ${success.bid}`),
      }, {
        where: { id: success.UserId },
      })
    });
    job.on('error', console.error);
    job.on('success', () => {
      console.log(`${good.id} 스케줄링 성공`)
    })
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.renderAuction = async(req, res, next) => {
  try {
    const [good, auction] = await Promise.all([
      Good.findOne({
        where: {
          id: req.params.id
        },
        include: {
          model: User,
          as: 'Owner'
        }
      }),
      Auction.findAll({
        where: {
          GoodId: req.params.id
        },
        include: {
          model: User
        },
        order: [['bid', 'ASC']]
      }),
    ]);
    res.render('auction', {
      title: `${good.name} - NodeAuction`,
      good,
      auction,
    })
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.bid = async (req, res, next) => {
  try {
    const {bid, msg} = req.body;
    const good = await Good.findOne({
      where: { id: req.params.id },
      include: { model: Auction },
      order: [[{ model: Auction}, 'bid', 'DESC']]
    });
    // try {
    //   console.log('파라미터 값:' + req.user.money);
    // } catch(error) {
    //   console.error('파라미터 값:' + error);
    //   next(error);
    // }
    if (req.user.money < bid) {
      return res.status(403).send('소유하신 자산보다 높은 금액은 제시할수 없습니다.');
    }
    if (!good) {
      return res.status(404).send('해당 상품은 없습니다.');
    }
    if (good.price >= bid) {
      return res.status(403).send('시작 가격보다 높아야합니다.');
    }
    if (new Date(good.createdAt).valueOf() + (24 * 60 * 60 * 1000) < new Date()) {
      return res.status(403).send('경매가 종료 되었습니다.');
    }
    if (good.Auctions[0]?.bid >= bid) {
      return res.status(403).send('이전 입찰가보다 높아야 합니다');
    }
    const result = await Auction.create({
      bid,
      msg,
      UserId: req.user.id,
      GoodId: req.params.id,
    });
    req.app.get('io').to(req.params.id).emit('bid', {
      bid: result.bid,
      msg: result.msg,
      nick: req.user.nick,
    });
  } catch(error) {
    console.error(error);
    next(error);
  }
};

exports.renderList = async(req, res, next) => {
  try {
    const goods = await Good.findAll({
      where: { SoldId: req.user.id },
      include: { model: Auction },
      order: [[{ model: Auction }, 'bid', 'DESC']],
    })
    res.render('list', { title : '낙찰 목록 - NodeAcution', goods });
  } catch(error) {
    console.error(error);
    next(error);
  }
} 