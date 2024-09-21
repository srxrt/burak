import { T } from "../libs/types/common";
import { NextFunction, Request, Response } from "express";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput, AdminRequest } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { Message } from "../libs/Errors";

const restaurantController: T = {};

const memberService = new MemberService();

restaurantController.goHome = (req: Request, res: Response) => {
	try {
		console.log("goHome");
		res.render("home");
	} catch (err) {
		console.log("ERROR GOHOME", err);
		res.redirect("/admin");
	}
};

restaurantController.getSignup = (req: Request, res: Response) => {
	try {
		console.log("getSignup");
		res.render("signup");
	} catch (err) {
		console.log("ERROR Signup", err);
		res.redirect("/admin");
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
		req.session.member = result;
		req.session.save(() => {
			res.send(result);
		});
	} catch (err) {
		console.log("ERROR Process Signup", err);
		const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
		res.send(
			`<script> alert("${message}")window.location.replace('/admin/signup')</script>`
		);
	}
};

restaurantController.getLogin = (req: Request, res: Response) => {
	try {
		console.log("getLogin");
		res.render("login");
	} catch (err) {
		console.log("ERROR Login", err);
		res.redirect("/admin");
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
		});
	} catch (err) {
		console.log("ERROR Processlogin", err);
		const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
		res.send(
			`<script> alert("${message}")window.location.replace('/admin/login')</script>`
		);
	}
};

restaurantController.checkAuthSession = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		if (req.session?.member) {
			res.send(
				`<script>alert('Hello ${req.session.member.memberNick}')</script>`
			);
		} else {
			res.send(`<script> alert("${Message.NOT_AUTHENTICATED}")</script>`);
		}
	} catch (err) {
		res.send(err);
	}
};

restaurantController.logout = async (req: AdminRequest, res: Response) => {
	try {
		console.log("Logout");
		req.session.destroy(() => {
			res.redirect("/admin");
		});
	} catch (err) {
		console.log(err);
		res.redirect("/admin");
	}
};

restaurantController.verifyRestaurant = (
	req: AdminRequest,
	res: Response,
	next: NextFunction
) => {
	if (req.session?.member?.memberType === MemberType.RESTAURANT) {
		req.member = req.session.member;
		next();
	} else {
		const message = Message.NOT_AUTHENTICATED;
		res.send(
			`<script> alert("${message}"); window.location.replace('/admin/login')</script>`
		);
	}
};
export default restaurantController;
