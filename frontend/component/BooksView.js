// src/BooksView.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

function BooksView() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data.allBooks.map((book) => (
          <li key={book.title}>
            {book.title} by {book.author} (Published: {book.published})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksView;
