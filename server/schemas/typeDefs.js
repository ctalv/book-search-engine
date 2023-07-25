// Define the necessary Query and Mutation types

// do we need password?? in User
const { gql } = require('apollo-server-express')

// authors is an object from the api

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String): User
    }

    type Auth {
        token: ID!
        user: User
      }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(
            bookId: String
            authors: [String]
            description: String
            title: String
            image: String
            link: String
        ): User
        removeBook(userId: ID!, bookId: ID!): User
    }
`;

module.exports = typeDefs;

// Query type:
//  me: Which returns a User type.

// Mutation type:
//  login: Accepts an email and password as parameters; returns an Auth type.
//  addUser: Accepts a username, email, and password as parameters; returns an Auth type.
//  saveBook: Accepts a book author's array, description, title, bookId, image, and link as 
//  parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
//  removeBook: Accepts a book's bookId as a parameter; returns a User type.

// User type:
//  _id
//  username
//  email
//  bookCount
//  savedBooks (This will be an array of the Book type.)

// Book type:
//  bookId (Not the _id, but the book's id value returned from Google's Book API.)
//  authors (An array of strings, as there may be more than one author.)
//  description
//  title
//  image
//  link

// Auth type:
//  token
//  user (References the User type.)