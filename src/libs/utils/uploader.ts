import path from "path";
import multer from "multer";
import { v4 } from "uuid";
import fs from "fs";

function getTargetImageStorage(address: any) {
	return multer.diskStorage({
		destination: (res, file, cb) => {
			const filePath = path.join("./uploads", address);
			if (fs.existsSync(filePath)) cb(null, filePath);
			else fs.mkdirSync(path.join("./uploads", address));
			cb(null, filePath);
		},
		filename: (res, file, cb) => {
			const extension = path.parse(file.originalname).ext;
			const random_name = v4() + extension;
			cb(null, random_name);
		},
	});
}

const makeUploader = (address: string) => {
	const storage = getTargetImageStorage(address);
	return multer({ storage: storage });
};
export default makeUploader;

/*
const product_storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/products");
	},
	filename:(req, file, cb) => {
		console.log(file);
		const exension = path.parse(file.originalname).ext;
		const random_name = v4() + extension;
		cb(null, random_name);
	},
});

export const uploadProductImage = multer({ storage: product_storage });
*/
