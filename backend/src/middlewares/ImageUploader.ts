import multer from 'multer';
import path from 'path';

const tmpStorage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
	  const filetypes = /jpeg|jpg|png|gif/;
	  const mimetype = filetypes.test(file.mimetype);
	  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	  if (mimetype && extname) {
		    return cb(null, true);
	  }
	  cb('Error: File upload only supports the following filetypes - ' + filetypes);
}

export const ImageUpload = multer({
	// storage: storage,
	storage: tmpStorage,
	fileFilter: fileFilter,
	limits: { fileSize: 3000000 } // 3MB
})
