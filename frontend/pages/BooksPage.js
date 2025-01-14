const GET_BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      genres
    }
  }
`;

const BooksPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { loading, error, data } = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <div>
      <h1>Books</h1>
      <div>
        <label>Filter by genre:</label>
        <select onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
        </select>
      </div>
      <ul>
        {data.allBooks.map((book) => (
          <li key={book.title}>
            {book.title} by {book.author.name} (Genres: {book.genres.join(', ')})
          </li>
        ))}
      </ul>
    </div>
  );
};
