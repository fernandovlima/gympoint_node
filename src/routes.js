import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Fernando Lima',
    email: 'fernandovlima.s@gmail.com',
    password_hash: '131313',
  });
  return res.json(user);
});

export default routes;
