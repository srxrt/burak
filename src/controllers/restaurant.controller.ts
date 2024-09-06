import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";

const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
	try {
		console.log("goHome");
		res.send("You are on homepage");
	} catch (err) {
		console.log("ERROR GOHOME", err);
	}
};
restaurantController.getLogin = (req: Request, res: Response) => {
	try {
		console.log("getLogin");
		res.send("You are on login");
	} catch (err) {
		console.log("ERROR Login", err);
	}
};
restaurantController.getSignup = (req: Request, res: Response) => {
	try {
		console.log("getSignup");
		res.send("You are on Signup");
	} catch (err) {
		console.log("ERROR Signup", err);
	}
};

restaurantController.processLogin = (req: Request, res: Response) => {
	try {
		console.log("processLogin");
		res.send("Process login");
	} catch (err) {
		console.log("ERROR Processlogin", err);
	}
};
restaurantController.processSignup = (req: Request, res: Response) => {
	try {
		console.log("processSignup");
		res.send("Process Signup");
	} catch (err) {
		console.log("ERROR Process Signup", err);
	}
};

export default restaurantController;
