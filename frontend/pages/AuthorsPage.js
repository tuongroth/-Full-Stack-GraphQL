import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
      bookCount
    }
  }
`;

const AuthorsPage = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {data.allAuthors.map((author) => (
          <li key={author.name}>
            {author.name} - Books: {author.bookCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsPage;
