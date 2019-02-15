const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  """
  Node to use in network vis
  """
  type Node {
    "system generated id.  It represents creation time in milliseconds."
    _id: ID!
    "system generate datetime of creating node (UTC)"
    _createdAt: String!
    "values expected: person, product or organization"
    type: String!
    "short label shown in the node"
    label: String!
    "node name depending on the type is name of person, product or organization"
    name: String!
    "stringified and base64 encoded data object. Depending on the type it has different props. To extract decode base64 and parse json string."
    data: String
  }
  """
  Link between two nodes in the network
  """
  type Link {
    "system generated id.  It represents creation time in milliseconds."
    _id: ID!
    "system generate datetime of creating node (UTC)"
    _createdAt: String!
    "source node represented by node _id"
    source: String!
    "target node represented by node _id"
    target: String!
    "stringified and base64 encoded data object. Depending on the type it has different props. To extract decode base64 and parse json string."
    data: String
  }
  """
  NodeInput type defines props to be provided in addNode mutation
  """
  input NodeInput {
    type: String!
    label: String!
    name: String!
    data: String
  }
  """
  LinkInput type defines props to be provided in addNode mutation
  """
  input LinkInput {
    "source node represented by node _id"
    source: String!
    "target node represented by node _id"
    target: String!
    "stringified json data object. It will have different props depending on the node types connected. To extract parse the json string."
    data: String
  }
  """
  Avaliable mutations. User can create, update and delete nodes and links between 2 nodes.
  """
  type RootMutation {
    """
    Creates new node and returns Node object
    """
    createNode(node:NodeInput):Node
    """
    Creates new link between two nodes and returns Link object
    """
    createLink(link:LinkInput):Link

    """
    Delete existing node based on node _id
    """
    deleteNode(_id:String!):Boolean
    """
    Delete existing link between two nodes based on link _id
    """
    deleteLink(_id:String!):Boolean
  }
  """
  Avaliable queries. User can request the list of nodes and links.
  """
  type RootQuery {
    "Get list of all nodes"
    nodes: [Node]
    "Get list of all links between the nodes"
    links: [Link]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }

`)
