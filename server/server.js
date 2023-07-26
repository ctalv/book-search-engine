// Implement the Apollo Server and apply it to the Express server as middleware.
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');



const db = require('./config/connection');
// const routes = require('./routes'); we wont use routes
const { typeDefs, resolvers } = require('./schemas');


const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());


// to add ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

mongoose
  .connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log(err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// process.on('uncaughtException', function (err) {
//   console.log(err);
// }); 
// app.use(routes);

// Homepage start and display index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}/`);
    })
  })
  };


// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

// Call the async function to start the server
startApolloServer();
