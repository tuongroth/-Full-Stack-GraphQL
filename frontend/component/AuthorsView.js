// src/AuthorsView.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
    }
  }
`;

function AuthorsView() {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {data.allAuthors.map((author) => (
          <li key={author.name}>
            {author.name} - {author.bookCount} books
          </li>
        ))}
      </ul>
      <button onClick={() => console.log('Add New Author')}>Add Author</button>
    </div>
  );
}

export default AuthorsView;
