
const rootQuery = require('./rootQuery')
const rootMutation = require('./rootMutation')

module.exports = {
  rootQuery: new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
  })
}