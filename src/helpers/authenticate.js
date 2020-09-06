import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const authenticate = (req, res, next) => {
  let token =  req.headers['authorization'] || req.headers['x-access-token'];

  if (!token) {
    return res.status(401)
    .json({
      msg: 'Not authorized.'
    })
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded)=> {
    if(err) {
      return res.status(401)
      .json({
        msg: 'Expired token.'
      })
    }
    req.user = decoded;
    next();
  });

}


export default authenticate;