import express from "express";
const routerAdmin = express();
import restaurantController from "./controllers/restaurant.controller";

// Restaurant
routerAdmin.get("/", restaurantController.goHome);
routerAdmin
	.get("/login", restaurantController.getLogin)
	.post("/login", restaurantController.processLogin);
routerAdmin
	.get("/signup", restaurantController.getSignup)
	.post("/signup", restaurantController.processSignup);

// Products

// Users

export default routerAdmin;
