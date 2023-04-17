import { Router } from 'express';

import CarcassonneController from './CarcassonneController';
import authMiddleware from '../../middlewares/auth';

const routes = new Router();

// routes.get('/ranking', authMiddleware, SolarFlareTicketController.ranking);
routes.post('/match', CarcassonneController.newMatch);
routes.post('/interface', CarcassonneController.getInterface);
routes.post('/city', CarcassonneController.city);
routes.post('/road', CarcassonneController.road);
routes.post('/monastery', CarcassonneController.monastery);
routes.post('/garden', CarcassonneController.garden);
routes.post('/farm', CarcassonneController.farm);
routes.post('/mamada', CarcassonneController.mamada);
routes.post('/barn', CarcassonneController.barn);
routes.post('/moveFairy', CarcassonneController.moveFairy);
routes.post('/countConstructor', CarcassonneController.countConstructor);
routes.post('/addCity', CarcassonneController.addCity);
routes.post('/removeCity', CarcassonneController.removeCity);
routes.post('/addRoad', CarcassonneController.addRoad);
routes.post('/removeRoad', CarcassonneController.removeRoad);
routes.post('/addFairyPoint', CarcassonneController.addFairyPoint);
routes.post('/removeFairyPoint', CarcassonneController.removeFairyPoint);
routes.post('/addGold', CarcassonneController.addGold);
routes.post('/removeGold', CarcassonneController.removeGold);
routes.post('/addBarrel', CarcassonneController.addBarrel);
routes.post('/removeBarrel', CarcassonneController.removeBarrel);
routes.post('/addWheat', CarcassonneController.addWheat);
routes.post('/removeWheat', CarcassonneController.removeWheat);
routes.post('/addSilk', CarcassonneController.addSilk);
routes.post('/removeSilk', CarcassonneController.removeSilk);

export default routes;
