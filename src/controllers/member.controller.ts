import { LoginInput, Member } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { MemberInput } from "../libs/types/member";
import Errors from "../libs/Errors";
import AuthService from "../models/Auth.service";

// REACT ucun
const memberController: T = {};
const memberService = new MemberService();
const authService = new AuthService();

memberController.signup = async (req: Request, res: Response) => {
	try {
		console.log("Signup");

		const input: MemberInput = req.body,
			result: Member = await memberService.signup(input);
		// TODO: TOKEN
		const token = await authService.createToken(result);
		console.log(token);

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
		const token = await authService.createToken(result);
		console.log(token);
		res.json({ member: result });
	} catch (err) {
		console.log("ERROR Login", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);
	}
};
export default memberController;
