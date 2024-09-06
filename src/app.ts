import express from "express";
import path from "path";
const app = express();
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

// entrance
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan(MORGAN_FORMAT));

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Routers
app.use("/", router);
app.use("/admin", routerAdmin); //EJS
export default app; // module.exports = app;
