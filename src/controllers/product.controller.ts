import { T } from "../libs/types/common";
import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import ProductService from "../models/Product.service";
import { AdminRequest } from "../libs/types/member";
import { ProductInput } from "../libs/types/product";

const productService = new ProductService();
const productController: T = {};

/**SSR */
productController.getAllProducts = async (req: Request, res: Response) => {
	try {
		console.log("getAllProducts");
		res.render("products");
	} catch (err) {
		console.log("getAllProducts", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);
	}
};
productController.createNewProduct = async (
	req: AdminRequest,
	res: Response
) => {
	try {
		console.log("createNewProduct");
		if (!req.files?.length)
			throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

		const data: ProductInput = req.body;
		data.productImages = req.files.map((ele) => {
			return ele.path;
		});
		await productService.createNewProduct(data);
		res.send(
			"<script>alert('Successfully created'); window.location.replace('/admin/product/all')</script>"
		);
	} catch (err) {
		console.log("Error:createNewProduct", err);
		const message =
			err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
		res.send(`res.send(
			<script>alert('${message}'); window.location.replace('/admin/product/all')</script>
		);`);
	}
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
	try {
		console.log("updateChosenProduct");
		res.send("update chosen product done");
	} catch (err) {
		console.log("updateChosenProduct", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);
	}
};

export default productController;
