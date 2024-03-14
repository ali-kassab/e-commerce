import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { brandTypes } from "./brand.types.js";
import { getBrandsResolve, updateBrandResolve } from "./brand.resolve.js";




export const allBrandsQl = {
    name: 'get all Brands',
    description: 'get all Brands and single by searching',
    type: new GraphQLList(brandTypes),
    args: {
        name: { type: GraphQLString },
        token: { type: new GraphQLNonNull(GraphQLString) }
    }, resolve: getBrandsResolve

}


export const updateBrandQl = {
    name: 'UpdateBrandQl',
    description: 'Update a brand by ID',
    type: brandTypes,
    args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString }
    },
    resolve: updateBrandResolve
};



