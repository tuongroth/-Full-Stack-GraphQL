// src/AddBook.js
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`;

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genres, setGenres] = useState('');
  
  const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      // Handle post-mutation (e.g., reset form, show success message)
      setTitle('');
      setAuthor('');
      setPublished('');
      setGenres('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ variables: { title, author, published: parseInt(published), genres: genres.split(',') } });
  };

  if (loading) return <p>Adding book...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <label>
          Published:
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            required
          />
        </label>
        <label>
          Genres (comma separated):
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
