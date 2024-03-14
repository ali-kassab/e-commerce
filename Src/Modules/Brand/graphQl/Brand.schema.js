import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { allBrandsQl, updateBrandQl } from "./brand.fildes.js";




export const brandSchemaGraph = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'brandQuery',
        description: 'brand schema description',
        fields: {
            allBrandsQl: allBrandsQl,

        }
    }),
    mutation: new GraphQLObjectType({
        name: 'brandMutation',
        description: 'brand schema description',
        fields: {
            updateBrandQl: updateBrandQl,
        }
    })
})