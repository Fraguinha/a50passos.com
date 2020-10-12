// Requires
import express, { Express } from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';

// Functions
const configure = (app: Express) => {
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, '/../../public')));
  app.set('views', path.join(__dirname, '/../../views'));
  app.set('layout', 'layouts/default');
  app.set('view engine', 'ejs');
};

export = { configure };
