import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";

class MemberService {
	private readonly memberModelClass; // member schema model class
	constructor() {
		this.memberModelClass = MemberModel;
	}

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
}

export default MemberService;
// what do they do, service models?
