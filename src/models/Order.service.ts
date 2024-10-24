import mongoose from "mongoose";
import OrderModel from "../schema/Order.model";
import { Order, OrderInput, OrderItem, OrderItemInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import OrderItemModel from "../schema/OrderItem.model";
import { Member } from "../libs/types/member";
import { shapeIntoMongooseObjectId } from "../libs/config";

class OrderService {
	private readonly orderModel;
	private readonly orderItemModel;
	constructor() {
		this.orderModel = OrderModel;
		this.orderItemModel = OrderItemModel;
	}

	public async createOrder(member: Member, input: OrderItemInput[]): Promise<Order> {
		const amount = input.reduce((total: number, ele) => {
			return (total = total + ele.itemPrice);
		}, 0);

		const delivery = amount < 100 ? 5 : 0;
		const orderInput: OrderInput = {
			orderTotal: amount + delivery,
			orderDelivery: delivery,
			orderStatus: OrderStatus.PAUSE,
			memberId: member._id,
		};

		try {
			const newOrder = await this.orderModel.create(orderInput);

			if (!newOrder) {
				throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
			}
			const orderId = newOrder._id;
			await this.recordOrderItem(orderId, input);
			return newOrder;
		} catch (err) {
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
		}
	}

	private async recordOrderItem(
		orderId: mongoose.ObjectId,
		input: OrderItemInput[]
	): Promise<void> {
		const promisedList = input.map(async (item: OrderItemInput) => {
			item.orderId = orderId;
			item.productId = shapeIntoMongooseObjectId(item.productId);

			await this.orderItemModel.create(item);
		});
		await Promise.all(promisedList);
	}
}

export default OrderService;
