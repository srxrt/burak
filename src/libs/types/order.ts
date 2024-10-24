import mongoose from "mongoose";
import { OrderStatus } from "../enums/order.enum";

export interface OrderItem {
	_id: mongoose.ObjectId;
	itemQuantity: number;
	itemPrice: number;
	orderId: mongoose.ObjectId;
	productId: mongoose.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderItemInput {
	itemQuantity: number;
	itemPrice: number;
	orderId: mongoose.ObjectId;
	productId: mongoose.ObjectId;
}

export interface Order {
	_id: mongoose.ObjectId;
	orderTotal: number;
	orderDelivery: number;
	orderStatus: OrderStatus;
	memberId: mongoose.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderInput {
	orderTotal: number;
	orderDelivery: number;
	orderStatus: OrderStatus;
	memberId: mongoose.ObjectId;
}
