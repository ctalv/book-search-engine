import { gql } from '@apollo/client';

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          _id
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql`
  mutation saveBook(
    $userId: ID!
    $bookId: String
    $authors: [String]
    $description: String
    $title: String
    $image: String
    $link: String
    ) {
    saveBook(
      userId: $userId, 
      bookId: $bookId
      authors: $authors
      description: $description
      title: $title
      image: $image
      link: $link
      ) {
      _id
      username
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// REMOVE_BOOK will execute the removeBook mutation
export const REMOVE_BOOK = gql`
  mutation removeBook(    $userId: ID!
    $bookId: String
    $authors: [String]
    $description: String
    $title: String
    $image: String
    $link: String
    ) {
    saveBook(
      userId: $userId, 
      bookId: $bookId
      authors: $authors
      description: $description
      title: $title
      image: $image
      link: $link
      ) {
      _id
      username
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
