// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthorsView from './components/AuthorsView';
import BooksView from './components/BooksView';
import AddBook from './components/AddBook';
import SetBirthYear from './components/SetBirthYear';
import SelectAuthor from './components/SelectAuthor';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <h1>GraphQL Library</h1>
          <Switch>
            <Route path="/authors" component={AuthorsView} />
            <Route path="/books" component={BooksView} />
            <Route path="/add-book" component={AddBook} />
            <Route path="/set-birth-year" component={SetBirthYear} />
            <Route path="/select-author" component={SelectAuthor} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
