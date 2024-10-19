import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";

/* Member*/
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.get(
	"/member/detail",
	memberController.verifyAuth,
	memberController.getMemberDetail
);
router.post("/member/logout", memberController.verifyAuth, memberController.logout);
router.post(
	"/member/update",
	memberController.verifyAuth,
	uploader("members").single("memberImage"),
	memberController.updateMember
);
router.get(
	"/member/top-users",
	memberController.verifyAuth,
	memberController.getTopUsers
);
export default router;
