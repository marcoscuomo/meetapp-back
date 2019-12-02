import User from '../models/User';

class UserController {
  async store(req, res) {
    const { id, email, provider, name } = await User.create(req.body);

    return res.json({ id, email, provider, name });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (user.email !== email) {
      const userExists = User.findOne({ where: { email } });

      if (userExists) {
        return res.status(401).json({ error: 'User already existes' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, provider, email });
  }
}

export default new UserController();
