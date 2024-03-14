import { brandModel } from "../../../../Database/models/brand.model.js";
import { validationGraphQL } from "../../../middleware/validation.js";
import { authorizationGraphQL } from "../../auth/auth.controller.js";
import { searchSchemaQL } from "../Brand.validation.js";







export const getBrandsResolve = async (parent, args) => {
    authorizationGraphQL(args.token, ['admin'])
    validationGraphQL(searchSchemaQL, args);
    const search = args.name ? { name: args.name } : {}
    const brands = await brandModel.find(search).populate('createdBy');
   
    return brands
}


export const updateBrandResolve = async (parent, args) => {
    const updatedBrand = await brandModel.findByIdAndUpdate(args._id, { name: args.name }, { new: true }).populate('createdBy');
    return updatedBrand;
}
