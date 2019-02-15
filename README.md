# CG netwerk GraphQL api

This backend is created in Node.js and uses GraphQL to read/write data to json files.
It is part of tests performed to using Gatsby front-end with React components that load data dynamically from GraphQL backend.

Front-end part can be found in [this repo](https://github.com/dmijatovic/gatsby-with-apollo-test).

**CORS: if you get cors error adjust code in server.js line 17 to accept request from proper url**

## Development

```bash
  # to start development server with nodemon
  npm run dev
  # to start server
  npm start
```

### Project structure

- **data**: contains json data files used by GraphQL and two nodejs scripts to manage read/write of json files. dbman script holds the data in memory after backend is started.
- **graphql**: contains graphql defitions schema and resolvers. The resolever script depends on data/dbman script for read/write of json files. The basic schema uses
- **server.js**: script contaning node server code that starts express and graphQL backend. It contains port number where graphQL surver will runs.
- **Dockerfile**: dockerfile to to create container. See next chapter for more info.

### Running api in Docker container

This GraphQL api can be runned in docker container. The api listens on port 8080.
To build and run api in the container on port 9000:

```bash
  # 1.build container
  docker build -t cg/networks-api .

  # 2.run container and expose app on port 9000
  docker run -p 9000:8080 -d --name=cg-networks-api cg/networks-api
```
