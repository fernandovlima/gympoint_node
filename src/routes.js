import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpOrdersUnanswered from './app/controllers/HelpOrdersUnanswered';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

// checkin
routes.get('/students/:studentId/checkin', CheckinController.index);
routes.post('/students/:studentId/checkin', CheckinController.store);

// help orders
routes.get('/students/:studentId/help-orders/', HelpOrderController.index);
routes.post('/students/:studentId/help-orders/', HelpOrderController.store);

// help onders unanswered
routes.get('/help-orders/unanswered', HelpOrdersUnanswered.index);

// middleware de auth apenas para as rotas abaixo de onde esta declarado.
routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

// plans
routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:planId', PlanController.update);
routes.delete('/plans/:planId', PlanController.delete);

// registrations
routes.get('/registrations', RegistrationController.index);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:registrationId', RegistrationController.update);
routes.delete('/registrations/:registrationId', RegistrationController.delete);

// help order answer
routes.post('/help-orders/:helpId/answer', HelpOrdersUnanswered.store);

export default routes;
