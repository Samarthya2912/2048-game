var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")
const { getAllUsers } = require("./db_functions.js")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    users: [User]
  }

  type User {
    id: String,
    username: String,
    password: String,
    max_score: String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
    hello: () => {
        return "Hello world!"
    },
    users: () => {
        return getAllUsers();
    }
}

var app = express()
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")
