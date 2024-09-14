import { T } from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput, AdminRequest } from "../libs/types/member";
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

restaurantController.getSignup = (req: Request, res: Response) => {
	try {
		console.log("getSignup");
		res.render("signup");
	} catch (err) {
		console.log("ERROR Signup", err);
	}
};

restaurantController.processSignup = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		console.log("processSignup");

		const newMember: MemberInput = req.body;
		newMember.memberType = MemberType.RESTAURANT;
		const result = await memberService.processSignup(newMember);
		// session authentication =>
		// signup bolgandan kn sessionning iciga member credentialsni yukladik
		// va sessionlarni hosil qilamiz
		req.session.member = result; //this is modifying the session
		req.session.save(() => {
			//saves the session data to the session store
			res.send(result); // puts the session id into the cookie and modifies the response to include that cookie
		});

		// SESSION Authentication
		// res.render("signup", { user: result });
	} catch (err) {
		console.log("ERROR Process Signup", err);
		res.send(err);
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

restaurantController.processLogin = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		console.log("processLogin");
		const input: LoginInput = req.body;

		const result = await memberService.processLogin(input);
		req.session.member = result;
		req.session.save(() => {
			res.send(result);
			// res.render("login", { user: result });
		});
	} catch (err) {
		console.log("ERROR Processlogin", err);
		res.send(err);
	}
};

export default restaurantController;
