import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String]!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
