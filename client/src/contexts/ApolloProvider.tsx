import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

export default apolloClient