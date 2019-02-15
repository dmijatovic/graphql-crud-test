const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString
} = require('graphql');

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: "Commong ground networks backend",
  fields:{
    nodes:{
      type: new GraphQLList(NodeType),
      resolve(parent, args){
        return []
      },
      description: "Get complete collection of nodes"
    },
  }
}

module.exports = rootQuery