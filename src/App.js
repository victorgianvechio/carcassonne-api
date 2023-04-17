import express from 'express';

import allowCors from './middlewares/cors';

import carcassonneRoutes from './app/Carcassonne/carcassonne.routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(allowCors);
    this.server.use(express.static('./public'));
    this.server.use('/public', express.static('./public'));
  }

  routes() {
    this.server.get('/', (req, res) => {
      res.redirect('/api/v1');
    });

    this.server.get('/api/v1', (req, res) => {
      return res
        .status(200)
        .json({ status: true, message: 'carcassonne-api is running' });
    });

    this.server.use('/api/v1/carcassonne', carcassonneRoutes);
  }
}

export default new App().server;
