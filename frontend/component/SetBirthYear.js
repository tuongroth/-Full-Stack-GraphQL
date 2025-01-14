// src/SetBirthYear.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

function SetBirthYear() {
  const [authorName, setAuthorName] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const [editAuthor, { data, loading, error }] = useMutation(EDIT_AUTHOR);

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: authorName, setBornTo: parseInt(birthYear) } });
  };

  if (loading) return <p>Updating birth year...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Author Name:
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </label>
        <label>
          Birth Year:
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            required
          />
        </label>
        <button type="submit">Set Birth Year</button>
      </form>
    </div>
  );
}

export default SetBirthYear;
