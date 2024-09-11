import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
	private readonly memberModelClass; // member schema model class
	constructor() {
		// nimaga bunga tenglab oldik? prosta ishlatsagam bolardiyu.
		this.memberModelClass = MemberModel;
	}

	// these methods cannot simply return Member type, because they are async function
	// so they have to return promise that is a member type. this is basically the same thing
	// it would return
	// if it wasnt an async function. this is just a part of the syntax

	public async processSignup(input: MemberInput): Promise<Member> {
		const exist = await this.memberModelClass
			.findOne({ memberType: MemberType.RESTAURANT })
			.exec();

		// .exec() => bu query chainni toxtat/tugat or query chainning oxiri dgan manoni bildiradi
		// va resourceni kam iwlatadi. Buni qoymasak ham iwlaydi.

		if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

		try {
			const result = await this.memberModelClass.create(input);
			return result;
		} catch (err) {
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
		}
	}

	public async processLogin(input: LoginInput): Promise<Member> {
		//findOne() ikkinchi argument chaqirilishi shart bolgan propertylarni kiritish uchun ishlatiladi
		// bu joyda memberNick va memberPassword chaqirilishi shart qilib belgilandi.
		// memberPassword ni {select:false} qlib belgilagan bolsagam, endi bizga qaytaradi
		// propertylar ketmaketligiga amal qlish kerak

		const member = await this.memberModelClass
			.findOne(
				{ memberNick: input.memberNick },
				{ _id: 0, memberNick: 1, memberPassword: 1 }
			)
			.exec();

		if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

		const isMatch = input.memberPassword === member.memberPassword;

		if (!isMatch)
			throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);

		return await this.memberModelClass.findById(member._id).exec();
	}
}

export default MemberService;
