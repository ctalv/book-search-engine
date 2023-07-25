// Define the query and mutation functionality to work with the Mongoose models.
const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('books');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('books');
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ createdAt: -1 });
        },
        book: async (parent, { bookId }) => {
            return Book.findOne({ _id: bookId });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookId, authors, description,  title, image, link }) => {
            return User.findOneAndUpdate(
              { _id: userId },
              {
                $addToSet: { savedBooks: {authors, bookId, description,  title, image, link } },
              },
              {
                new: true,
                runValidators: true,
              }
            );
        },
        removeBook: async (parent, { bookId }) => {
            return User.findOneAndUpdate(
              { _id: userId },
              { $pull: { savedBooks: { _id: bookId } } },
              { new: true }
            );
          },
    },
};

module.exports = resolvers;
