import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// middleware de auth apenas para as rotas abaixo de onde esta declarado.
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

export default routes;
