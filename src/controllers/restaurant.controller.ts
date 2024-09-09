import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const restaurantController: T = {}; //nimaga object? class emas?
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
restaurantController.processSignup = async (req: Request, res: Response) => {
	try {
		console.log("processSignup");

		const newMember: MemberInput = req.body;
		newMember.memberType = MemberType.RESTAURANT;

		const memberService = new MemberService();
		const result = await memberService.processSignup(newMember);
		console.log({ result });

		res.send({ result });
	} catch (err) {
		console.log("ERROR Process Signup", err);
		res.send(err);
		// bu error memberModelClass.create() dan kelyaptimi???
	}
};

export default restaurantController;
