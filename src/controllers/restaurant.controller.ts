import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
	try {
		res.send("You are on homepage");
	} catch (err) {
		console.log("ERROR GOHOME", err);
	}
};
restaurantController.getLogin = (req: Request, res: Response) => {
	try {
		res.send("You are on login");
	} catch (err) {
		console.log("ERROR Login", err);
	}
};
restaurantController.getSignup = (req: Request, res: Response) => {
	try {
		res.send("You are on Signup");
	} catch (err) {
		console.log("ERROR Signup", err);
	}
};

export default restaurantController;