import { subCategoryModel } from './../../../Database/models/subCategory.model.js';
import { catchError } from '../../middleware/catchError.js';
import { addOne, deleteOne, getall, getsingle, updateOne } from '../../Handler/handler.js';
import { categoryModel } from './../../../Database/models/category.model.js';
import { AppError } from '../../utilites/AppError.js';


// this function used in middelware to check if category exist
export const isCategoryExist = catchError(async (req, res, next) => {
    const isCategoryExist = await categoryModel.findById(req.body.category)
    if (!isCategoryExist) return next(new AppError('category is not found', 404));
    next()
})

export const addsubCategory = addOne(subCategoryModel, 'subCategory','category')

export const getsubCategories = getall(subCategoryModel, 'subCategory', 'category')

export const getSinglesubCategory = getsingle(subCategoryModel, 'subCategory', 'category')

export const updatesubCategory = updateOne(subCategoryModel, 'subCategory','category')

export const deletesubCategory = deleteOne(subCategoryModel, 'subCategory','category')


