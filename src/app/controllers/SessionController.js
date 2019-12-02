import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    // verifica se a senha está correta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ msg: 'password does not match' });
    }

    const { id, name } = user;

    return res.json({
      User: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secreat, {
        expiresIn: authConfig.experesIn,
      }),
    });
  }
}

export default new SessionController();
