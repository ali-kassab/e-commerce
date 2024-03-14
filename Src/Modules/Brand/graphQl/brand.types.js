import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const usersTypes = new GraphQLObjectType({
    name: 'usersTypes',
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
    }
})


export const brandTypes = new GraphQLObjectType({
    name: 'BrandTypes',
    fields:
    {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        logo: { type: GraphQLString },
        createdBy: {
            type: usersTypes,
            resolve: (parent) => {

                return parent.createdBy.map(user => ({ _id: user._id }))
            }
        }

    }
})