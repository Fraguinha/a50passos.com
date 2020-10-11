import bodyParser from 'body-parser';
import { Express } from 'express';

// Functions
const configure = (app: Express) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

export = { configure };
