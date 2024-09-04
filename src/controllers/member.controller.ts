import { T } from "../libs/types/common";
import { Request, Response } from "express";

const memberController: T = {};
memberController.goHome = (req: Request, res: Response) => {
	try {
		res.send("You are on homepage");
	} catch (err) {
		console.log("ERROR GOHOME", err);
	}
};
memberController.getLogin = (req: Request, res: Response) => {
	try {
		res.send("You are on login");
	} catch (err) {
		console.log("ERROR Login", err);
	}
};
memberController.getSignup = (req: Request, res: Response) => {
	try {
		res.send("You are on Signup");
	} catch (err) {
		console.log("ERROR Signup", err);
	}
};

export default memberController;
