// src/graphql/client.js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // Your backend GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;
