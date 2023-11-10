const axios = require('axios');

exports.test = async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });

      if (tokenResult.data?.code === 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        console.error('토큰 발급 실패:', tokenResult.data);
        return res.status(500).json({ error: '토큰 발급 실패' });
      }
    }

    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: { authorization: req.session.jwt },
    });

    return res.json(result.data);
  } catch (error) {
    console.error('토큰 테스트 중 에러:', error);

    if (error.response?.status === 401) {
      return res.status(401).json({ error: '토큰이 유효하지 않습니다.' });
    }

    if (error.response?.status === 419) {
      return res.status(419).json({ error: '토큰이 만료되었습니다.' });
    }

    return next(error);
  }
};