import express from "express";
import path from "path";
const app = express();
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDBSession(session);

const store = new MongoDBStore({
	uri: String(process.env.MONGO_URI),
	collection: "sessions",
});

// entrance
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan(MORGAN_FORMAT));
app.use(
	session({
		secret: String(process.env.SESSION_SECRET),
		cookie: {
			maxAge: 1000 * 3600 * 3, // 3h
		},
		store: store,
		resave: true,
		saveUninitialized: true,
	})
);

// sessions

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Routers
app.use("/", router);
app.use("/admin", routerAdmin); //EJS
export default app; // module.exports = app;
