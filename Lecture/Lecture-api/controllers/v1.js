const { Domain, USer } = require("../models");

exports.createTokoen = async (req, res) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }]
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록해주세요.'
      })
    }
    const token = jwt.sign({
      id : domain.User.id,
      nick: domain.User.nick,
    }, 
    process.env.JWT_SECRET, {
    expiresIn : '1m',
    issuer: 'nodebird',
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러'
    })
  }
}

exports.tokoenTest = async (req, res) => {
  res.json(res.locals.decoded);
  }