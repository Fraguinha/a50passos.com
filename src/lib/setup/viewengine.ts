// Requires
import express, { Express } from "express";
import expressLayouts from "express-ejs-layouts";

// Functions
const configure = (app: Express) => {
  app.use(expressLayouts);
  app.use(express.static("public"));
  app.set("layout", "layouts/default");
  app.set("view engine", "ejs");
};

export = { configure };
