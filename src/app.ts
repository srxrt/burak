import express from "express";
import path from "path";
const app = express();
import router from "./router";
import routerAdmin from "./routerAdmin";

// entrance
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Routers
app.use("/", router);
app.use("/admin", routerAdmin); //EJS
export default app; // module.exports = app;
