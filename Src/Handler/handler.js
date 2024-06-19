import slugify from "slugify"
import { catchError } from "../middleware/catchError.js"
import { AppError } from "../utilites/AppError.js"
import { ApiFeature } from "../utilites/apiFeature.js"





// this function is used to add document in many models 
export const addOne = (model, modelName) => {

    return catchError(async (req, res, next) => {
        req.body.slug = slugify(req.body.name)
        if (req.file && req.file.filename) {
            let imageFiledName = 'image'
            if (modelName == 'brand') {
                imageFiledName = 'logo'
            }
            // check if name exists in database 
            let newModel = await model.findOne({ name: req.body.name });
            if (newModel) { return next(new AppError(`${modelName} already exist`, 404)) }
            //store the image and create on req.body image
            req.body[imageFiledName] = req.file.filename
            // create all in body with image
            let document = await model.create(req.body)
            res.json({ message: 'success', [modelName]: document })
        } else {
            next(new AppError('you must add image', 404))
        }
    })
}


// this function is used to get all documents in many models 
export const getall = (model, modelName, populateFields) => {

    return catchError(async (req, res, next) => {
        let apiFeature = new ApiFeature(model.find(), req.query)
            .fields().sort().pagenation().search().filter()
        if (populateFields) {
            apiFeature.mongooseQuery = apiFeature.mongooseQuery.populate(populateFields);
        }
        let document = await apiFeature.mongooseQuery
        document && res.json({ message: 'success', page: apiFeature.pageNumber, [modelName]: document })
        !document && next(new AppError(`${modelName} not found`, 404))
    })
}

// this function is used to get single document in many models 
export const getsingle = (model, modelName) => {
    return catchError(async (req, res, next) => {
        let document = await model.findById(req.params.id)
        document && res.json({ message: 'success', [modelName]: document })
        !document && next(new AppError(`${modelName} not found`, 404))
    })
}


// this function is used to delete document in many models 
export const deleteOne = (model, modelName) => {
    return catchError(async (req, res, next) => {
        // Find the document first to check if it exists
        let document = await model.findById(req.params.id);

        if (!document) {
            return res.json({ message: `${modelName} not found` });
        }

        // Delete the document
        await model.findByIdAndDelete(req.params.id);

        // Check if the document has an image and delete it from the filesystem
        if (document.image) {
            const fullPath = document.image;
            const fileName = path.basename(fullPath);
            const folderPath = path.join(process.cwd(),'uploadsFolder');
            const imagePath = path.join(folderPath,fileName);

            // Delete the image from the filesystem
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Failed to delete image file:", err);
                    return next(new AppError('Failed to delete image file', 500));
                }
            });
        }

        // Respond with success
        res.json({ message: 'success', [modelName]: document });
    });
};

// this function is used to update document in many models 
export const updateOne = (model, modelName) => {
    return catchError(async (req, res, next) => {
        // Check if the new name exists in the database before updating
        if (req.body.name) {
            const existingDocument = await model.findOne({ name: req.body.name });
            if (existingDocument) {
                return next(new AppError(`Name of ${modelName} already exists`, 400));
            }
        }
        if (req.body.name) req.body.slug = slugify(req.body.name);
        if (req.file) req.body.image = req.file.filename;

        
        // Check if the document exists in the database and update
        let document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        document && res.json({ message: 'success', [modelName]: document });
        !document && next(new AppError(`${modelName} not found`, 404));
    });
};
