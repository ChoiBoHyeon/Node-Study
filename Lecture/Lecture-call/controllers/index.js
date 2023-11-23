const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN; // origin 헤더 추가


const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      })
      req.session.jwt = tokenResult.data.token;
    }
    return await axios.get(`${URL}${api}`, {
      headers : {authorization: req.session.jwt },
    })
  } catch (error) {
    if (error.response?.status === 419) { // 토큰 만료 시
      delete req.session.jwt; // 만료시 세션에서 jwt 제거
      return request(req, api);
    }
    return error.response; // 재귀함수 사용해서 다시 jwt 만들기
  }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my');
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.searchByHashtag = async (req, res, next) => {
  try {
    const result = await request(
      req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`, // 한글 디코딩
    );
    res.json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
};

exports.renderMain = (req, res) => {
  res.render('main',{ key: process.env.CLIENT_SECRET });
}

/*
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
*/