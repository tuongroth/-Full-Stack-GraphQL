const Author = require('./models/author');
const Book = require('./models/book');
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Define User model for authentication

const resolvers = {
  Query: {
    allBooks: async (_, { author, genre }) => {
      let filter = {};
      if (author) {
        const authorObj = await Author.findOne({ name: author });
        filter.author = authorObj ? authorObj._id : null;
      }
      if (genre) {
        filter.genres = genre;
      }
      return Book.find(filter).populate('author');
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors.map(author => {
        return {
          ...author.toObject(),
          bookCount: await Book.countDocuments({ author: author._id })
        };
      });
    },
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  
  Mutation: {
    addBook: async (_, { title, author, published, genres }) => {
      let authorObj = await Author.findOne({ name: author });
      if (!authorObj) {
        authorObj = new Author({ name: author });
        await authorObj.save();
      }
      const book = new Book({ title, author: authorObj._id, published, genres });
      await book.save();
      return book.populate('author');
    },
    editAuthor: async (_, { name, setBornTo }) => {
      const author = await Author.findOne({ name });
      if (!author) return null;
      author.born = setBornTo;
      await author.save();
      return author;
    },
    createUser: async (_, { username, favoriteGenre }) => {
      const user = new User({ username, favoriteGenre });
      await user.save();
      return user;
    },
    login: async (_, { username, password }) => {
      // Assume all users have a hardcoded password
      const user = await User.findOne({ username });
      if (!user || password !== 'password') {
        throw new Error('Invalid credentials');
      }
      const userForToken = { username: user.username, id: user._id };
      const token = jwt.sign(userForToken, 'secret');
      return { value: token };
    }
  }
};

module.exports = resolvers;
