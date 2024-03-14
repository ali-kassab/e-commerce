import { brandModel } from './../../../Database/models/brand.model.js';
import { addOne, deleteOne, getall, getsingle, updateOne } from '../../Handler/handler.js';



export const addBrand = addOne(brandModel, 'brand')

export const getBrand = getall(brandModel, 'brand')

export const getSinglebrand = getsingle(brandModel, 'brand')

export const updatebrand = updateOne(brandModel, 'brand')

export const deletebrand = deleteOne(brandModel, 'brand')

