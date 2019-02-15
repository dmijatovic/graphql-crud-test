const dbman = require('../data/dbman')

module.exports = {
  createNode(args, req){
    //get info from args
    //console.log(`Request to add node: ${JSON.stringify(args.node)}`)
    return dbman.addNode(args.node)
  },
  createLink(args, req){
    //get info from args
    //console.log(`Request to add link: ${JSON.stringify(args.link)}`)
    return dbman.addLink(args.link)
  },
  deleteNode(args, req){
    //console.log("delete node...", args._id)
    return dbman.deleteNode(args._id)
  },

  deleteLink(args, req){
    console.log("delete link...", args._id)
    return true
  },

  nodes () {
    let nodes = dbman.getNodes()
    return nodes
  },
  links () {
    let links = dbman.getLinks()
    return links
  }
}
