import MemberModel from "../schema/Member.model";
import {
	LoginInput,
	Member,
	MemberInput,
	MemberUpdateInput,
} from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MemberService {
	private readonly memberModelClass; // member schema model class
	constructor() {
		this.memberModelClass = MemberModel;
	}

	/** SPA */
	public async signup(input: MemberInput): Promise<Member> {
		const salt = await bcrypt.genSalt();
		input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

		try {
			const result = await this.memberModelClass.create(input);
			result.memberPassword = "";
			return result.toJSON();
		} catch (err) {
			console.log("ERROR, model:signup:", err);
			throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
		}
	}

	public async login(input: LoginInput): Promise<Member> {
		const member = await this.memberModelClass
			.findOne(
				{ memberNick: input.memberNick },
				{ memberNick: 1, memberPassword: 1 }
			)
			.exec();

		if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

		const isMatch = await bcrypt.compare(
			input.memberPassword,
			member.memberPassword
		);

		if (!isMatch) {
			throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
		}

		return await this.memberModelClass.findById(member._id).lean().exec();
	}

	/**BSSR */
	public async processSignup(input: MemberInput): Promise<Member> {
		const exist = await this.memberModelClass
			.findOne({ memberType: MemberType.RESTAURANT })
			.exec();

		if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
		const salt = await bcrypt.genSalt();
		input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

		try {
			const result = await this.memberModelClass.create(input);
			result.memberPassword = "";
			return result;
		} catch (err) {
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
		}
	}

	public async processLogin(input: LoginInput): Promise<Member> {
		const member = await this.memberModelClass
			.findOne(
				{ memberNick: input.memberNick },
				{ memberNick: 1, memberPassword: 1 }
			)
			.exec();

		if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

		const isMatch = await bcrypt.compare(
			input.memberPassword,
			member.memberPassword
		);

		if (!isMatch) {
			throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
		}

		const result = await this.memberModelClass.findById(member._id).exec();
		return result;
	}

	public async getUsers(): Promise<Member[]> {
		const result = await this.memberModelClass
			.find({
				memberType: MemberType.USER,
			})
			.exec();

		if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
		return result;
	}
	public async updateChosenUser(input: MemberUpdateInput): Promise<Member[]> {
		const memberId = shapeIntoMongooseObjectId(input._id);
		const result = await this.memberModelClass
			.findByIdAndUpdate(
				{
					_id: memberId,
				},
				input,
				{ new: true }
			)
			.exec();

		if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);
		return result;
	}
}

export default MemberService;
