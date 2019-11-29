import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ msg: 'Hello World' });
});

// Rota teste para criação de um usuário no banco
routes.get('/teste', async (req, res) => {
  const user = await User.create({
    name: 'Marcos Souza',
    email: 'marcos.souza@itws.com',
    password_hash: '12334324',
    provider: false,
  });

  return res.json(user);
});

export default routes;
