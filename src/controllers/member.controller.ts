import { LoginInput, Member } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors from "../libs/Errors";

// REACT ucun
const memberController: T = {};
const memberService = new MemberService();

memberController.signup = async (req: Request, res: Response) => {
	try {
		console.log("Signup");

		const input: MemberInput = req.body,
			result: Member = await memberService.signup(input);
		// TODO: TOKEN

		res.json({ member: result });
	} catch (err) {
		console.log("ERROR Signup", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);
	}
};
memberController.login = async (req: Request, res: Response) => {
	try {
		console.log("Login");
		const input: LoginInput = req.body,
			result = await memberService.login(input);
		//TODO: TOKENs
		res.json({ member: result });
	} catch (err) {
		console.log("ERROR Login", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);
	}
};
export default memberController;
