import { AUTH_TIMER } from "../libs/config";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";
import Errors, { HttpCode, Message } from "../libs/Errors";

class AuthService {
	private readonly secretToken;
	constructor() {
		this.secretToken = process.env.TOKEN_SECRET as string;
	}
	public async createToken(payload: Member) {
		return new Promise((resolve, reject) => {
			const duration = `${AUTH_TIMER}`;
			jwt.sign(
				payload,
				this.secretToken,
				{ expiresIn: `${duration}h` },
				(err, token) => {
					if (err)
						reject(
							new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED)
						);
					else resolve(token);
				}
			);
		});
	}
	public async checkAuth(token: string): Promise<Member> {
		const result: Member = (await jwt.verify(
			token,
			this.secretToken
		)) as Member;
		console.log("___________AUTH:", result.memberNick);
		return result;
	}
}

export default AuthService;
