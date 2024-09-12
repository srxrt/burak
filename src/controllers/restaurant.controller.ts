import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const restaurantController: T = {}; //nimaga object? class emas?

const memberService = new MemberService();

restaurantController.goHome = (req: Request, res: Response) => {
	try {
		console.log("goHome");
		res.render("home");
	} catch (err) {
		console.log("ERROR GOHOME", err);
	}
};
restaurantController.getLogin = (req: Request, res: Response) => {
	try {
		console.log("getLogin");
		res.render("login");
	} catch (err) {
		console.log("ERROR Login", err);
	}
};
restaurantController.getSignup = (req: Request, res: Response) => {
	try {
		console.log("getSignup");
		res.render("signup");
	} catch (err) {
		console.log("ERROR Signup", err);
	}
};

restaurantController.processLogin = async (req: Request, res: Response) => {
	try {
		console.log("processLogin");
		const input: LoginInput = req.body;

		const result = await memberService.processLogin(input);

		res.render("login", { user: result });
	} catch (err) {
		console.log("ERROR Processlogin", err);
		res.send(err);
	}
};
restaurantController.processSignup = async (req: Request, res: Response) => {
	try {
		console.log("processSignup");

		const newMember: MemberInput = req.body;
		newMember.memberType = MemberType.RESTAURANT;

		const result = await memberService.processSignup(newMember);

		res.render("signup", { user: result });
	} catch (err) {
		console.log("ERROR Process Signup", err);
		res.send(err);
	}
};

export default restaurantController;
