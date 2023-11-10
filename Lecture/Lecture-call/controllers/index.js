const axios = require('axios');

exports.test = async (req, res, next) => {
  try {
    // 토큰이 없다면
    if (!req.session.jwt) {
      // 토큰 발급 api로 이동 후 도튼 발급
      const tokenResult = await axios.post('http://localhost:8002/v1/token', {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data?.code === 200) {
        req.session.jwt = tokenResult.data.token;
      } else {
        return res.status(tokenResult.data?.code).json(tokenResult.data)
      }
    }
    // 만약 이미 session에 발급받은 토큰이 저장되어 있다면 test api로 이동해 검사
    const result = await axios.get('http://localhost:8002/v1/test', {
      headers: { authorization: req.session.jwt },
    });
    return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response?.status === 419) { // 토큰 만료 시
      return res.json(error.response.data);
    }
    return next(error);
  }
};