import { Express } from 'express';
import catalog from "../../routes/catalog";
import dashboard from "../../routes/dashboard";
import house from "../../routes/house";
import index from "../../routes/index";
import login from "../../routes/login";

// Functions
const configure = (app: Express) => {
  app.use("/", index);

  app.use("/catalog", catalog);
  app.use("/house", house);
  app.use("/login", login);
  app.use("/dashboard", dashboard);

  // Not found
  app.use((req, res) => {
    res.status(404).render("main/error.ejs", {
      error: 404,
      description: "A página solicitada não foi encontrada."
    });
  });
};

export = { configure };
