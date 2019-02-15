const fs = require('fs')

module.exports = {
  readDB: (fileName) => {
    return new Promise((res,rej)=>{
      fs.readFile(fileName,'utf-8',(err, data)=>{
        if (err) {
          console.error("Failed to read data: ", err)
          rej(err)
        }
        if (data!=='undefined'){
          let nodes = JSON.parse(data)
          console.log(`${fileName}...loaded`)
          res(nodes)
        } else {
          console.log(`${fileName}...loaded`)
          res([])
        }
      })
    })
  },
  writeDB: (fileName, data=null) => {
    let str="[]"
    if (data!=null){
      str = JSON.stringify(data)
    }
    // console.log(`Save data to ${fileName}...`, str)
    return fs.writeFile(fileName, str,'utf-8', err => {
      if (err){
        console.error("Failed to save data: ",err)
      }
    })
  },
  /**
   * Create ID based on time in milliseconds and random number
   * @returns {String} unique id
   */
  createId: () => {
    const time = new Date().valueOf()
    const rand = Math.round((Math.random() * 1000000))
    return `${time}CG${rand}`
  },
  /**
   * CreatedAt date
   * @returns {String} date in ISO format
   */
  createdAt: () => {
    const d = new Date().toISOString()
    return d
  }
}