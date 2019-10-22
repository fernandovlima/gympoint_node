import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// middleware de auth apenas para as rotas abaixo de onde esta declarado.
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

// plans
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:planId', PlanController.update);
routes.delete('/plans/:planId', PlanController.delete);

// registrations
routes.get('/registrations', RegistrationController.index);
routes.post('/registrations/:studentId', RegistrationController.store);
routes.put('/registrations/:registrationId', RegistrationController.update);
routes.delete('/registrations/:registration:id', RegistrationController.delete);

export default routes;
