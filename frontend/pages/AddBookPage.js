import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`;

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genres, setGenres] = useState('');

  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBook({
        variables: {
          title,
          author,
          published: parseInt(published),
          genres: genres.split(',').map((genre) => genre.trim()),
        },
      });

      // Reset form fields after successful submission
      setTitle('');
      setAuthor('');
      setPublished('');
      setGenres('');
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book');
    }
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Published Year:</label>
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Genres (comma separated):</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
