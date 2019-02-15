// express setup
const express = require('express')
const app = express()
const port = 8080

//graphQL setup
const graphQLHttp = require('express-graphql')
const gqlSchema = require('./graphql/schema')
const gqlResolvers = require('./graphql/resolvers')

//-----------------------------------
// MIDDLEWARE: HANDLE OPTIONS request
//-----------------------------------
app.use((req,res,next)=>{
  //NOTE CORS should be adapted
  //allow requests only from 'http://localhost:8000'
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000')
  res.setHeader(
    'Access-Control-Allow-Methods','OPTIONS, GET, POST'
  )
  res.setHeader(
    'Access-Control-Allow-Headers', 'Content-Type,Authorization'
  )
  if (req.method==='OPTIONS'){
    // console.log("Options method allowed")
    return res.send(200)
  }
  next()
})

//----------------------------------
// ROUTES
//----------------------------------
app.get('/',(req,res)=>{
  res.send(`
    <section style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:80vh;">
      <h1>Hello GraphQL!</h1>
      <p>This is NodeJS GraphQL server for CG network visualization.</P
      <p>For avaliabile queries in GraphiQL go <a href="/graphql">HERE</a></p>
    </section>
    `)
})
//graphQL route for the request
//and graphiql tool is enabled
app.use('/graphql', graphQLHttp({
  schema: gqlSchema,
  rootValue: gqlResolvers,
  graphiql: true
}))

//startup app
app.listen(port,()=>{
  console.log(`GraphQL server is listening on port...${port}`)
})
