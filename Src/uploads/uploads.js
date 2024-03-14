import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../utilites/AppError.js";

export const fileUpload = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + '-' + file.originalname)
        }
    })

    const fileFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new AppError('Only image jpg or png', 401), false)
        }
    }
    const upload = multer({ storage, fileFilter })
    return upload
}

export const uploadSingleFile = (fieldname) => fileUpload().single(fieldname)
export const uploadArrayofFiles = (fieldname) => fileUpload().array(fieldname)
export const uploadFileds = (fields) => fileUpload().fields(fields)
