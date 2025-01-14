// src/SelectAuthor.js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Select from 'react-select';

const GET_AUTHORS = gql`
  query {
    allAuthors {
      name
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

function SelectAuthor() {
  const { data, loading, error } = useQuery(GET_AUTHORS);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [birthYear, setBirthYear] = useState('');
  const [editAuthor, { loading: mutationLoading, error: mutationError }] = useMutation(EDIT_AUTHOR);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAuthor) {
      editAuthor({
        variables: {
          name: selectedAuthor.name,
          setBornTo: parseInt(birthYear),
        },
      });
    }
  };

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Set Author Birth Year</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Author:
          <Select
            options={data.allAuthors.map((author) => ({
              value: author.name,
              label: author.name,
            }))}
            onChange={(selectedOption) => setSelectedAuthor(selectedOption)}
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

export default SelectAuthor;
