import { T } from "../libs/types/common";
import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import ProductService from "../models/Product.service";
import { AdminRequest } from "../libs/types/member";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { ProductCollection } from "../libs/enums/product.enum";

const productService = new ProductService();
const productController: T = {};

/**SSR */
productController.getAllProducts = async (req: Request, res: Response) => {
	try {
		console.log("getAllProducts");
		const data = await productService.getAllProducts();

		res.render("products", { products: data });
	} catch (err) {
		console.log("getAllProducts", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);
	}
};
productController.createNewProduct = async (req: AdminRequest, res: Response) => {
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
		const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
		res.send(`res.send(
			<script>alert('${message}'); window.location.replace('/admin/product/all')</script>
		);`);
	}
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
	try {
		console.log("updateChosenProduct");
		const id = req.params.id;
		const result = await productService.updateChosenProduct(id, req.body);
		res.status(HttpCode.OK).json({ data: result });
	} catch (err) {
		console.log("updateChosenProduct", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);
	}
};

/** SPA */
productController.getProducts = async (req: Request, res: Response) => {
	try {
		console.log("getProducts");
		const { order, page, limit, productCollection, search } = req.query;

		const inquiry: ProductInquiry = {
			order: String(order),
			page: Number(page),
			limit: Number(limit),
		};

		if (productCollection)
			inquiry.productCollection = productCollection as ProductCollection;
		if (search) inquiry.search = String(search);

		const data = await productService.getProducts(inquiry);

		res.status(HttpCode.OK).json({ products: data });
	} catch (err) {
		console.log("getAllProducts", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standard.code).json(Errors.standard);
	}
};
export default productController;
