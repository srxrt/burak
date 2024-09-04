import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import mongoose from "mongoose";

mongoose
	.connect(process.env.MONGO_URL as string, {})
	.then((data) => {
		console.log("MongoDB connection success");
		const PORT = process.env.PORT || 3003;
		app.listen(PORT, () => {
			console.log(`Server is running successfully on port: ${PORT}`);
		});
	})
	.catch((err) => console.log("ERROR on connection mongodb", err));
