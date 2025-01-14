// src/graphql/queries.js
import { gql } from '@apollo/client';

// Query to get all books
export const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

// Query to get all authors
export const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
    }
  }
`;

// Mutation to add a new book
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`;

// Mutation to set author's birth year
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
