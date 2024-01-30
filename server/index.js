const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const { getAllUsers, addUser, getUserByUsername, updateUser, getLeaderboard } = require("./db_functions.js")
const { v4: uuidv4 } = require('uuid');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    all_users: [User]
    user(username: String!): User
    leaderboard: [User]
  }

  type Mutation {
    create_user(username: String!, password: String!): User
    update_max_score(username: String!, new_max_score: Int!): User
  }

  type User {
    id: String,
    username: String,
    password: String,
    max_score: String
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
    all_users: () => {
        return getAllUsers();
    },
    user: ({ username }) => {
        return getUserByUsername(username);
    },
    leaderboard: () => {
        return getLeaderboard();
    },
    create_user: ({ username, password }) => {
        try {
            const newUser = { username, password, max_score: 0, id: uuidv4() };
            addUser(newUser);
            return newUser;
        } catch(err) {
            throw err;
        }
    },
    update_max_score: ({ username, new_max_score }) => {
        return updateUser(username, { max_score: new_max_score });
    }
}

const app = express()
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
