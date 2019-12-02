import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token is not provieded' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secreat);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token invalid' });
  }
};
