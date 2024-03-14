import { categoryModel } from "../../../Database/models/category.model.js"
import { addOne, deleteOne, getall, getsingle, updateOne } from "../../Handler/handler.js";




export const addCategory = addOne(categoryModel, 'category')
export const getCategories = getall(categoryModel, 'category')
export const getSingleCategory = getsingle(categoryModel, 'category')
export const updateCategory = updateOne(categoryModel, 'category')
export const deleteCategory = deleteOne(categoryModel, 'category')


