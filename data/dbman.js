
const path = require('path')
const root = path.resolve(__dirname)

//------------------------------------
//initalize database
//------------------------------------
const dbutil = require('./dbutil')
const nodesFile = `${root}/nodes.json`
const linksFile = `${root}/links.json`
const saveInterval = 10000
//cache
let nodes = []
let links = []
//read
dbutil.readDB(nodesFile).then(data=>{
  nodes=data
})
dbutil.readDB(linksFile).then(data=>{
  links=data
})
//saving schedule
// const schedule = setInterval(()=>{
//   // console.log(`Saving ${nodesFile}`, nodes)
//   dbutil.writeDB(nodesFile,nodes)
//   // console.log(`Saving ${linksFile}`, links)
//   dbutil.writeDB(linksFile,links)
// },saveInterval)
/**
 * Database exposed function
 */
module.exports = {
  getNodes: () => {
    console.log("get nodes...")
    return nodes
  },
  getLinks: () => {
    console.log("get links...")
    return links
  },
  saveNodes: () => {
    console.log("Save nodes...")
    dbutil.writeDB({nodesFile,nodes})
  },
  saveLinks: () => {
    console.log("Save links...")
    dbutil.writeDB({linksFile,links})
  },
  addNode: node => {
    //console.log("Creating node...", node)
    let newNode = {
      ...node,
      _id: dbutil.createId(),
      _createdAt: dbutil.createdAt()
    }
    nodes.push(newNode)
    //save to disk -> non blocking
    dbutil.writeDB(nodesFile,nodes)
    console.log("newNode added...", newNode)
    return newNode
  },
  addLink: link => {
    //console.log("Creating node...", node)
    let newLink = {
      ...link,
      _id: dbutil.createId(),
      _createdAt: dbutil.createdAt()
    }
    links.push(newLink)
    //save to disk -> non blocking
    dbutil.writeDB(linksFile,links)
    console.log("newLink added...", newLink)
    return newLink
  },
  deleteNode: id =>{
    console.log("before deleting nodes...", nodes.length)
    let nodeList = nodes.filter( item => item._id!=id )
    console.log("after deleting nodes...", nodeList.length)
    if (nodeList.length < nodes.length){
      console.log(`nodes deleted...${nodes.length - nodeList.length}`)
      //overwrite with new selection
      nodes = nodeList
      //save to disk
      //save to disk -> non blocking
      dbutil.writeDB(nodesFile,nodes)
      return true
    } else {
      console.log("node not found!")
      return false
      // throw ("Node not found!!!")
    }
  }
}